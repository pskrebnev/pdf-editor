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
}

async function main(): Promise<void> {
  const editor = new PDFEditor();
  console.log('PDF Editor initialized');
}

if (require.main === module) {
  main().catch(console.error);
}