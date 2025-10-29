/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';

export class PDFEditor {
  async deletePages(
    inputPath: string,
    outputPath: string,
    pagesToDelete: number[]
  ): Promise<void> {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const sortedPages = pagesToDelete.sort((a, b) => b - a);

    for (const pageNum of sortedPages) {
      if (pageNum >= 0 && pageNum < pdfDoc.getPageCount()) {
        pdfDoc.removePage(pageNum);
      } else {
        console.warn(
          `Page ${pageNum + 1} is out of range (1-${pdfDoc.getPageCount()})`
        );
      }
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
  }

  async combinePages(inputPaths: string[], outputPath: string): Promise<void> {
    if (inputPaths.length === 0) {
      throw new Error('No input files specified');
    }

    const combinedPdf = await PDFDocument.create();

    for (const inputPath of inputPaths) {
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputPath}`);
      }
      const existingPdfBytes = fs.readFileSync(inputPath);
      const existingPdf = await PDFDocument.load(existingPdfBytes);
      const pages = await combinedPdf.copyPages(
        existingPdf,
        existingPdf.getPageIndices()
      );

      pages.forEach((page) => combinedPdf.addPage(page));
    }

    const pdfBytes = await combinedPdf.save();
    fs.writeFileSync(outputPath, pdfBytes);
  }

  async extractPages(
    inputPath: string,
    outputPath: string,
    pageNumbers: number[]
  ): Promise<void> {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const existingPdfBytes = fs.readFileSync(inputPath);
    const existingPdf = await PDFDocument.load(existingPdfBytes);
    const newPdf = await PDFDocument.create();

    const validPages = pageNumbers.filter(
      (pageNum) => pageNum >= 0 && pageNum < existingPdf.getPageCount()
    );

    if (validPages.length === 0) {
      throw new Error('No valid pages specified for extraction');
    }

    const pages = await newPdf.copyPages(existingPdf, validPages);
    pages.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();
    fs.writeFileSync(outputPath, pdfBytes);
  }

  async optimizePdf(
    inputPath: string,
    outputPath: string,
    compressionLevel: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<{ originalSize: number; optimizedSize: number; compressionRatio: number }> {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const existingPdfBytes = fs.readFileSync(inputPath);
    const originalSize = existingPdfBytes.length;
    
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pageCount = pdfDoc.getPageCount();
    console.log(`Optimizing PDF with ${pageCount} pages`);

    let saveOptions: any = {};

    switch (compressionLevel) {
      case 'low':
        saveOptions = {
          useObjectStreams: false,
          addDefaultPage: false,
        };
        break;
      case 'medium':
        saveOptions = {
          useObjectStreams: true,
          addDefaultPage: false,
        };
        break;
      case 'high':
        saveOptions = {
          useObjectStreams: true,
          addDefaultPage: false,
          updateFieldAppearances: false,
        };
        break;
    }

    const optimizedBytes = await pdfDoc.save(saveOptions);
    let optimizedSize = optimizedBytes.length;
    let currentBytes = optimizedBytes;

    if (compressionLevel === 'high') {
      try {
        const secondPassDoc = await PDFDocument.load(currentBytes);
        
        const finalBytes = await secondPassDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
          updateFieldAppearances: false,
        });
        
        if (finalBytes.length < optimizedSize) {
          currentBytes = finalBytes;
          optimizedSize = finalBytes.length;
          console.log('Second optimization pass applied');
        }
      } catch (error) {
        console.warn('Second optimization pass failed, using first pass result');
      }
    }

    const compressionRatio = ((originalSize - optimizedSize) / originalSize) * 100;

    fs.writeFileSync(outputPath, currentBytes);

    console.log(`Optimization complete: ${originalSize} -> ${optimizedSize} bytes (${compressionRatio.toFixed(2)}% reduction)`);

    return {
      originalSize,
      optimizedSize,
      compressionRatio: Math.round(compressionRatio * 100) / 100,
    };
  }
}

async function main(): Promise<void> {
  const editor = new PDFEditor();
  console.log('PDF Editor initialized');
  console.log('Available methods:');
  console.log('- deletePages(inputPath, outputPath, pagesToDelete)');
  console.log('- combinePages(inputPaths, outputPath)');
  console.log('- extractPages(inputPath, outputPath, pageNumbers)');
  console.log('- optimizePdf(inputPath, outputPath, compressionLevel)');
}

if (require.main === module) {
  main().catch(console.error);
}
