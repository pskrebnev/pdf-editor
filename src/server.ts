/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { PDFEditor } from './index';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const pdfEditor = new PDFEditor();

const ensureOutputDir = (): void => {
  const outputDir = 'output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
};

app.post(
  '/delete-pages',
  upload.single('pdf'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      const { pagesToDelete } = req.body;
      if (!pagesToDelete) {
        return res.status(400).json({ error: 'Pages to delete not specified' });
      }

      const pages = JSON.parse(pagesToDelete).map(
        (p: string) => parseInt(p) - 1
      );
      ensureOutputDir();

      const outputPath = path.join('output', 'deleted-pages-' + Date.now() + '.pdf');

      await pdfEditor.deletePages(req.file.path, outputPath, pages);

      res.download(outputPath, (err: unknown) => {
        if (!err) {
          fs.unlinkSync(req.file!.path);
          fs.unlinkSync(outputPath);
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete pages' });
    }
  }
);

app.post(
  '/combine-pdfs',
  upload.array('pdfs'),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No PDF files uploaded' });
      }

      ensureOutputDir();
      const outputPath = path.join('output', 'combined-' + Date.now() + '.pdf');
      const inputPaths = files.map((file) => file.path);

      await pdfEditor.combinePages(inputPaths, outputPath);

      res.download(outputPath, (err: unknown) => {
        if (!err) {
          files.forEach((file) => fs.unlinkSync(file.path));
          fs.unlinkSync(outputPath);
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to combine PDFs' });
    }
  }
);

app.post(
  '/extract-pages',
  upload.single('pdf'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      const { pagesToExtract } = req.body;
      if (!pagesToExtract) {
        return res
          .status(400)
          .json({ error: 'Pages to extract not specified' });
      }

      const pages = JSON.parse(pagesToExtract).map(
        (p: string) => parseInt(p) - 1
      );
      ensureOutputDir();

      const outputPath = path.join('output', 'extracted-pages-' + Date.now() + '.pdf');

      await pdfEditor.extractPages(req.file.path, outputPath, pages);

      res.download(outputPath, (err: unknown) => {
        if (!err) {
          fs.unlinkSync(req.file!.path);
          fs.unlinkSync(outputPath);
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to extract pages' });
    }
  }
);

app.listen(port, () => {
  console.log(`PDF Editor server running at http://localhost:${port}`);
});
