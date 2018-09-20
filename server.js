const express = require('express');
// const path = require('path');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

PORT = 3030;


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'reddit',
});


app.get('/hello', (req, res) => {
  res.send("hello world")
});

app.get('/api/posts', (req, res) => {
  conn.query(`SELECT * FROM posts`, (err, posts) => {
    if (err) {
      res.json({
        error: err.message,
      });
    };
    res.status(200).json({
      posts
    });
  });
});

app.post('/posts', jsonParser, (req, res) => {
  if (req.body && req.body.title && req.body.url) {
    conn.query(`INSERT INTO posts(title,url) VALUES ('${req.body.title}','${req.body.url}')`, (err, posts) => {
      if (err) {
        res.json({
          err: err.message,
        });
      };
      conn.query(`SELECT * FROM posts Where id=${posts.insertId}`, (err, posts) => {
        if (err) {
          res.json({
            err: err.message,
          });
        };
        res.status(200).json({
          posts
        });
      });
    });
  } else {
    console.log('Error');
    return
  };
});


app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});

