import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const staticDir = path.join(__dirname, 'PetTown_v1.30_source');

// Serve static files from root and game source directory
app.use(express.static(__dirname));
app.use(express.static(staticDir));
app.use('/PetTown_v1.30_source', express.static(staticDir));
app.use('/PetTown_v1.30_source', express.static(__dirname));

// Route navigation requests to index.html, 404 for missing static assets
app.get('*', (req, res) => {
  if (path.extname(req.path)) {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Pet Town server running on http://0.0.0.0:${PORT}`);
});
