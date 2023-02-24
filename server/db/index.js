// const {Client, Pool} = require('pg');
// const db = new Client({
//   host: 'localhost',
//   port: 5432,
//   database:'sdc'
// });
// db.connect(((err)=>{
//   if(err){
//     console.error('connection error', err.stack)
//   } else{
//     console.log('connected');
//   }
// }));
// exports.db = db;

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
exports.db = pool;
