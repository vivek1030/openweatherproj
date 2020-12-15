const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// Import Route
const apiRoute = require('./routes/api');

// Use View Engine
app.set('view engine', 'ejs');

// Middleware route
app.use('/', apiRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));