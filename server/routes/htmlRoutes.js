const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'), (err) => {
      if (err) {
        res.status(err.status).send(err.message);
      }
    });
  });
};