import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

export class PDFEditor {
  async deletePages(inputPath: string, outputPath: string, pagesToDelete: number[]): Promise<void> {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const sortedPages = pagesToDelete.sort((a, b) => b - a);

    for (const pageNum of sortedPages) {
      if (pageNum >= 0 && pageNum < pdfDoc.getPageCount()) {
        pdfDoc.removePage(pageNum);
      }
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
  }

  async combinePages(inputPaths: string[], outputPath: string): Promise<void> {
    const combinedPdf = await PDFDocument.create();

    for (const inputPath of inputPaths) {
      const existingPdfBytes = fs.readFileSync(inputPath);
      const existingPdf = await PDFDocument.load(existingPdfBytes);
      const pages = await combinedPdf.copyPages(existingPdf, existingPdf.getPageIndices());

      pages.forEach((page) => combinedPdf.addPage(page));
    }

    const pdfBytes = await combinedPdf.save();
    fs.writeFileSync(outputPath, pdfBytes);
  }
}

async function main(): Promise<void> {
  const editor = new PDFEditor();
  console.log('PDF Editor initialized');
  console.log('Available methods:');
  console.log('- deletePages(inputPath, outputPath, pagesToDelete)');
  console.log('- combinePages(inputPaths, outputPath)');
}

if (require.main === module) {
  main().catch(console.error);
}