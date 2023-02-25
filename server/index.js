require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes');

const { LOCAL_URL, PORT } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

/* MIDDLEWARE */
app.use(morgan('dev'));
// app.use(express.json({ limit: '32mb' }));
app.use(express.json());


app.use((req, res, next) => {
  if (req.url === '/') res.redirect('/?pid=40344');
  next();
});

app.get(`/${process.env.LOADER_IO}`, (req, res)=>{
  res.send(process.env.LOADER_IO);
})
app.use('/api', router);

app.listen(PORT);
// eslint-disable-next-line
console.log(`Server listening at ${LOCAL_URL}:${PORT}`);