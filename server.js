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
        err: err.message,
      });
    };
    res.status(200).json({
      posts
    });
  });
});

app.post('/posts', jsonParser, (req, res) => {
  if (req.body.title && req.body.url) {
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

app.put('/posts/:id/upvote', jsonParser, (req, res) => {
  let id = req.params.id;
  if (id) {
    conn.query(`UPDATE posts SET score = score+1 WHERE id = ${id}`, (err) => {
      if (err) {
        res.json({
          err: err.message,
        });
      };
      conn.query(`SELECT * FROM posts Where id=${id}`, (err, posts) => {
        if (err) {
          res.status(500).json({
            err: err.message,
          });
        };
        res.status(200).json({
          posts
        });
      });
    });
  } else {
    res.json({
      err: "Please provide an ID",
    });
  }
});


app.put('/posts/:id/downvote', jsonParser, (req, res) => {
  let id = req.params.id;
  conn.query(`UPDATE posts SET score = score-1 WHERE id = ${id}`, (err) => {
    if (err) {
      res.status(500).json({
        err: err.message,
      });
    };
    conn.query(`SELECT * FROM posts Where id=${id}`, (err, posts) => {
      if (err) {
        res.status(500).json({
          err: err.message,
        });
      };
      res.status(200).json({
        posts
      });
    });
  });
});

app.put('/posts/:id', jsonParser, (req, res) => {
  let id = req.params.id;
  let newTitle = req.body.title;
  let newUrl = req.body.url;
  conn.query(`UPDATE posts SET title = "${newTitle}", url = "${newUrl}" WHERE posts.id = ${id}`, (err) => {
    if (err) {
      res.status(500).json({
        err: err.message,
      });
    };
    conn.query(`SELECT * FROM posts Where id=${id}`, (err, posts) => {
      if (err) {
        res.status(500).json({
          err: err.message,
        });
      };
      res.status(200).json({
        posts
      });
    });
  });
});


app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});
