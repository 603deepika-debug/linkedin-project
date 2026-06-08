require('dotenv').config();
const express = require('express');
const path = require('path');
const linkedinRoutes = require('./routes/linkedin');
const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/linkedin', linkedinRoutes);

// Home → redirect to dashboard
app.get('/', (req, res) => res.redirect('/linkedin'));

// 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found', status: 404 });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: err.message, status: 500 });
});

app.listen(PORT, () => {
  console.log(`LinkedIn Scraper running at http://localhost:${PORT}`);
});

module.exports = app;
