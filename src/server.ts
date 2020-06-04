import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

// Express use(): Acts like plugin installation
// Understands JSON on body requests.
app.use(express.json());
// Apply routes froum routes.ts file.
app.use(routes);
// Serve static assets.
app.use('/assets', express.static(path.resolve(__dirname, '..', 'assets')));

app.listen(3333);
