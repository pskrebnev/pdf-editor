# PDF Editor

A simple and intuitive web-based PDF editor that allows you to perform basic PDF operations like deleting pages, combining multiple PDFs, extracting specific pages, and optimizing file size.

## Features

- **Delete Pages**: Remove unwanted pages from your PDF documents
- **Combine PDFs**: Merge multiple PDF files into a single document
- **Extract Pages**: Extract specific pages from a PDF into a new document
- **Optimize PDFs**: Reduce file size by compressing PDF documents with configurable compression levels
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

Build the entire project (backend + frontend):

```bash
npm run build:all
npm run web:build
```

Or build components separately:

```bash
npm run build          # Backend only
npm run build:frontend # Frontend only
```

### CLI Usage

You can also use the PDF editor programmatically:

```bash
npm run dev
```

## TypeScript Setup

This project uses TypeScript for both backend and frontend code:

- **Backend**: `src/index.ts` and `src/server.ts` compile to `dist/`
- **Frontend**: `src/script.ts` compiles to `public/script.js`
- **Separate configs**: `tsconfig.json` for backend, `tsconfig.frontend.json` for frontend
- **Type safety**: Full TypeScript checking for all code including DOM APIs

## API Endpoints

- `POST /delete-pages` - Delete specific pages from a PDF
- `POST /combine-pdfs` - Combine multiple PDF files
- `POST /extract-pages` - Extract specific pages from a PDF
- `POST /optimize-pdf` - Optimize PDF file size with configurable compression levels

### PDF Optimization

The optimization feature supports three compression levels:
- **Low**: Minimal compression with best quality preservation
- **Medium**: Balanced compression and quality (default)
- **High**: Maximum compression for smallest file size

The optimization process returns compression statistics including original size, optimized size, and compression ratio.

## Project Structure

```
pdf-editor/
├── src/
│   ├── index.ts          # Core PDF editing logic
│   ├── server.ts         # Express server and API routes
│   └── script.ts         # Frontend TypeScript (compiled to public/)
├── public/
│   ├── index.html        # Web interface
│   └── script.js         # Generated frontend JavaScript (from src/script.ts)
├── dist/                 # Compiled backend TypeScript output
├── uploads/              # Temporary file uploads
├── output/               # Generated PDF files
├── tsconfig.json         # Backend TypeScript configuration
├── tsconfig.frontend.json # Frontend TypeScript configuration
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
- `npm run build` - Compile backend TypeScript
- `npm run build:frontend` - Compile frontend TypeScript
- `npm run build:all` - Compile both backend and frontend
- `npm run web:build` - Full build + start production server
- `npm run lint` - Run ESLint on all TypeScript files
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier

## License

This project is licensed under the ISC License.

## Author

PDF Editor - A simple tool for basic PDF operations.
