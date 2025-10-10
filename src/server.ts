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

app.get('/', (req, res) => {
  res.json({ message: 'PDF Editor API' });
});

app.listen(port, () => {
  console.log(`PDF Editor server running at http://localhost:${port}`);
});