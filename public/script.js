async function deletePages() {
    const fileInput = document.getElementById('deleteFile');
    const pagesInput = document.getElementById('pagesToDelete');
    
    if (!fileInput.files[0]) {
        alert('Please select a PDF file');
        return;
    }
    
    if (!pagesInput.value) {
        alert('Please enter pages to delete');
        return;
    }
    
    const formData = new FormData();
    formData.append('pdf', fileInput.files[0]);
    formData.append('pagesToDelete', JSON.stringify(pagesInput.value.split(',').map(p => p.trim())));
    
    try {
        const response = await fetch('/delete-pages', {
            method: 'POST',
            body: formData
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

async function combinePDFs() {
    const fileInput = document.getElementById('combineFiles');
    
    if (!fileInput.files.length) {
        alert('Please select PDF files to combine');
        return;
    }
    
    const formData = new FormData();
    for (let file of fileInput.files) {
        formData.append('pdfs', file);
    }
    
    try {
        const response = await fetch('/combine-pdfs', {
            method: 'POST',
            body: formData
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

async function extractPages() {
    const fileInput = document.getElementById('extractFile');
    const pagesInput = document.getElementById('pagesToExtract');
    
    if (!fileInput.files[0]) {
        alert('Please select a PDF file');
        return;
    }
    
    if (!pagesInput.value) {
        alert('Please enter pages to extract');
        return;
    }
    
    const formData = new FormData();
    formData.append('pdf', fileInput.files[0]);
    formData.append('pagesToExtract', JSON.stringify(pagesInput.value.split(',').map(p => p.trim())));
    
    try {
        const response = await fetch('/extract-pages', {
            method: 'POST',
            body: formData
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