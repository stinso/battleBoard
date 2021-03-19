const express = require('express')
const calc = require('./calcScore')
const cors = require('cors')
const logger = require('./log/logger')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


calc.calcScore();

app.use(cors());
app.use(express.json());
app.use(require('./routes'));
app.disable('x-powered-by');

app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send({ error: 'Something failed!' });
  next();
});



/* if (process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // sandle React routing, return all requests to React app
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
  logger.info('App is running in production mode')
} else {
  logger.info('App is running in development mode')
} */

// Always in production. CHANGE THIS IN DEVELOPMENT
app.use(express.static(path.join(__dirname, 'client/build')));
// handle React routing, return all requests to React app
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
logger.info('App is running in production mode')


app.listen(PORT, () => {
  logger.info(`We are listening on Port: ${PORT}`);
});

