const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Use the correct path to serve static files from the client directory
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));