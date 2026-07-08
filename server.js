// TutorJulian InvoiceForge — static file server
// Single-file app lives in /public. This wrapper exists purely so Zeabur's
// Node buildpack has an unambiguous entrypoint (auto static-site detection
// can be flaky on Zeabur for single-HTML-file repos).
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

app.get('/healthz', (_req, res) => res.status(200).send('ok'));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TutorJulian InvoiceForge running on :${PORT}`);
});
