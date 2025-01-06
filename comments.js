// Create web server and listen to port 3000
// Create a route to get all comments
// Create a route to get a comment by id
// Create a route to create a comment
// Create a route to update a comment
// Create a route to delete a comment
// Create a route to delete all comments

const express = require('express');
const app = express();
const comments = require('./comments');

app.use(express.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  res.json(comment);
});

// Create a comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    comment: req.body.comment
  };
  comments.push(comment);
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  comment.comment = req.body.comment;
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
    return;
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

// Delete all comments
app.delete('/comments', (req, res) => {
  comments.length = 0;
  res.json(comments);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// comments.js
// Create an array of comments
const comments = [
  { id: 1, comment: 'Comment 1' },
    { id: 2, comment: 'Comment 2' }
  ];