require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes');

const { LOCAL_URL, PORT } = process.env;

const app = express();

/* MIDDLEWARE */
app.use(morgan('dev'));
app.use(express.json({ limit: '32mb' }));

app.use((req, res, next) => {
  if (req.url === '/') res.redirect('/?pid=40344');
  next();
});
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);

app.listen(PORT);
// eslint-disable-next-line
console.log(`Server listening at ${LOCAL_URL}:${PORT}`);