# PDF Editor

A simple and intuitive web-based PDF editor that allows you to perform basic PDF operations like deleting pages, combining multiple PDFs, and extracting specific pages.

## Features

- **Delete Pages**: Remove unwanted pages from your PDF documents
- **Combine PDFs**: Merge multiple PDF files into a single document
- **Extract Pages**: Extract specific pages from a PDF into a new document
- **Web Interface**: Clean, modern web UI for easy file operations
- **REST API**: Full API endpoints for programmatic access

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **PDF Processing**: pdf-lib
- **File Upload**: Multer
- **Frontend**: HTML5, CSS3, JavaScript
- **Development Tools**: ESLint, Prettier

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone <repository-url>
cd pdf-editor
```

### Install Dependencies

```bash
npm install
```

## Usage

### Development Mode

Start the development server:

```bash
npm run web
```

The application will be available at `http://localhost:3000`

### Production Build

Build the project:

```bash
npm run build
npm run web:build
```

### CLI Usage

You can also use the PDF editor programmatically:

```bash
npm run dev
```

## API Endpoints

- `POST /delete-pages` - Delete specific pages from a PDF
- `POST /combine-pdfs` - Combine multiple PDF files
- `POST /extract-pages` - Extract specific pages from a PDF

## Project Structure

```
pdf-editor/
├── src/
│   ├── index.ts          # Core PDF editing logic
│   └── server.ts         # Express server and API routes
├── public/
│   ├── index.html        # Web interface
│   └── script.js         # Frontend JavaScript
├── dist/                 # Compiled TypeScript output
├── uploads/              # Temporary file uploads
├── output/               # Generated PDF files
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Scripts

- `npm run dev` - Run CLI version in development
- `npm run web` - Start web server in development
- `npm run build` - Compile TypeScript
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

This project is licensed under the ISC License.

## Author

PDF Editor - A simple tool for basic PDF operations.
