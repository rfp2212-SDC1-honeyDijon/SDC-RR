const {Client, Pool} = require('pg');

const db = new Client({
  host: 'localhost',
  port: 5432,
  database:'sdc'
});

db.connect(((err)=>{
  if(err){
    console.error('connection error', err.stack)
  } else{
    console.log('connected');
  }
}));

exports.db = db;

// const pool = new Pool({ idleTimeoutMillis: 30000 });
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
