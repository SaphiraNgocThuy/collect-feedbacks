const express = require('express')
const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

// MYSQL connection
function makeDb( config ) {
    const connection = mysql.createConnection( config );
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
}

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'feedbacks'
}
const db = makeDb(dbConfig);

// EXPRESS
const app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS')
    req.header('content-type', 'application/json');

    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
});
app.use(express.json());

const port = process.env.BACKEND_PORT || 3001;

app.listen(port, () => {
    console.log(`Feedback Collection Widget listening at http://localhost:${port}`);
})


// API
app.get('/ratings/', async (req, res) => {
    const sqlQuery = 'SELECT rating FROM feedbacks';
    const result = await db.query(sqlQuery);
    res.send(result);
})


app.post('/ratings/', async (req, res) => {
  const rating = Number(req.body.rating);
  const sqlQuery = `INSERT INTO feedbacks (rating) VALUES (${rating})`;
  const result = await db.query(sqlQuery);
  res.status(200);
  res.send({id: result.insertId});
})

app.get('/responses/', async (req, res) => {
    const sqlQuery = 'SELECT like_most, like_least, email FROM feedbacks';
    const result = await db.query(sqlQuery);
    res.send(result);
})

app.put('/responses/:id', async (req, res) => {
    const response_id = req.params.id;
    const {like_most, like_least, email} = req.body;
    const sqlQuery = `UPDATE feedbacks SET like_most=${like_most? `'${like_most}'` : null}, like_least=${like_least? `'${like_least}'` : null}, email=${email? `'${email}'` : null} WHERE id = ${response_id}`;
    const result = await db.query(sqlQuery);
    res.status(200);
    res.send({message: "Updated successfully."});
})

app.get('/questions/', async (req, res) => {
  const sqlQuery = 'SELECT * from questions where is_enable=true';
  const result = await db.query(sqlQuery);
  res.send(result);
})

app.post('/questions/', async (req, res) => {
  const {is_enable, question_type, question} = req.body
  const sqlQuery = `INSERT INTO questions (is_enable, question_type, question) VALUE (${is_enable}, '${question_type}', '${question}')`;
  const result = await db.query(sqlQuery);
  res.status(200);
  res.send({id: result.insertId});
})

app.put('/questions/:id', async (res, res) => {
  const question_id = req.params.id;
  const {is_enable, question_type, question} = req.body
  const sqlQuery = `UPDATE questions SET is_enable=${is_enable}, question_type=${question_type}, question=${question} WHERE id = ${question_id}`;
  const result = await db.query(sqlQuery);
  res.status(200);
  res.send({message: "Updated successfully."});
})