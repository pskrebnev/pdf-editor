// Input validation for page numbers (only digits, commas, and dashes)
function validatePageInput(event: KeyboardEvent): boolean {
  const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
    'Tab',
    'Enter',
  ];

  // Allow control keys
  if (allowedKeys.includes(event.key)) {
    return true;
  }

  // Allow digits, commas, and dashes
  const allowedChars = /[0-9,-]/;
  if (!allowedChars.test(event.key)) {
    event.preventDefault();
    return false;
  }

  return true;
}

// Format and clean page input
function formatPageInput(input: HTMLInputElement): void {
  // Remove any characters that aren't digits, commas, or dashes
  let cleaned = input.value.replace(/[^0-9,-]/g, '');

  // Remove multiple consecutive commas or dashes
  cleaned = cleaned.replace(/[,-]{2,}/g, (match) => match[0]);

  // Remove leading/trailing commas or dashes
  cleaned = cleaned.replace(/^[,-]+|[,-]+$/g, '');

  input.value = cleaned;
}

// Add real-time validation to page input fields
function setupInputValidation(): void {
  const pageInputs = ['pagesToDelete', 'pagesToExtract'];

  pageInputs.forEach((id) => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      // Prevent invalid characters on keydown
      input.addEventListener('keydown', validatePageInput);

      // Clean up input on blur
      input.addEventListener('blur', () => formatPageInput(input));

      // Real-time cleaning on input
      input.addEventListener('input', () => {
        // Remove invalid characters as user types
        const cleaned = input.value.replace(/[^0-9,-]/g, '');
        if (cleaned !== input.value) {
          input.value = cleaned;
        }
      });
    }
  });
}

// Initialize validation when page loads
document.addEventListener('DOMContentLoaded', setupInputValidation);

async function deletePages(): Promise<void> {
  const fileInput = document.getElementById('deleteFile') as HTMLInputElement;
  const pagesInput = document.getElementById('pagesToDelete') as HTMLInputElement;

  if (!fileInput.files?.[0]) {
    alert('Please select a PDF file');
    return;
  }

  if (!pagesInput.value) {
    alert('Please enter pages to delete');
    return;
  }

  const formData = new FormData();
  formData.append('pdf', fileInput.files[0]);
  formData.append(
    'pagesToDelete',
    JSON.stringify(pagesInput.value.split(',').map((p) => p.trim()))
  );

  try {
    const response = await fetch('/delete-pages', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'deleted-pages.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('Error deleting pages');
    }
  } catch (error) {
    alert('Network error');
  }
}

async function combinePDFs(): Promise<void> {
  const fileInput = document.getElementById('combineFiles') as HTMLInputElement;

  if (!fileInput.files?.length) {
    alert('Please select PDF files to combine');
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < fileInput.files.length; i++) {
    formData.append('pdfs', fileInput.files[i]);
  }

  try {
    const response = await fetch('/combine-pdfs', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'combined.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('Error combining PDFs');
    }
  } catch (error) {
    alert('Network error');
  }
}

async function extractPages(): Promise<void> {
  const fileInput = document.getElementById('extractFile') as HTMLInputElement;
  const pagesInput = document.getElementById('pagesToExtract') as HTMLInputElement;

  if (!fileInput.files?.[0]) {
    alert('Please select a PDF file');
    return;
  }

  if (!pagesInput.value) {
    alert('Please enter pages to extract');
    return;
  }

  const formData = new FormData();
  formData.append('pdf', fileInput.files[0]);
  formData.append(
    'pagesToExtract',
    JSON.stringify(pagesInput.value.split(',').map((p) => p.trim()))
  );

  try {
    const response = await fetch('/extract-pages', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'extracted-pages.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('Error extracting pages');
    }
  } catch (error) {
    alert('Network error');
  }
}

// Make functions available globally for onclick handlers
(window as any).deletePages = deletePages;
(window as any).combinePDFs = combinePDFs;
(window as any).extractPages = extractPages;