import express from 'express';
import { PDFEditor } from './index';

const app = express();
const port = 3000;

app.use(express.json());

const pdfEditor = new PDFEditor();

app.get('/', (req, res) => {
  res.json({ message: 'PDF Editor API' });
});

app.listen(port, () => {
  console.log(`PDF Editor server running at http://localhost:${port}`);
});