import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PDFEditor } from './index';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const pdfEditor = new PDFEditor();

app.post('/delete-pages', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const { pagesToDelete } = req.body;
    if (!pagesToDelete) {
      return res.status(400).json({ error: 'Pages to delete not specified' });
    }

    const pages = JSON.parse(pagesToDelete).map((p: string) => parseInt(p) - 1);
    const outputPath = path.join('uploads', `deleted-pages-${Date.now()}.pdf`);

    await pdfEditor.deletePages(req.file.path, outputPath, pages);

    res.download(outputPath, (err) => {
      if (!err) {
        fs.unlinkSync(req.file!.path);
        fs.unlinkSync(outputPath);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pages' });
  }
});

app.listen(port, () => {
  console.log(`PDF Editor server running at http://localhost:${port}`);
});