 const express = require('express');
const router = express.Router();

let posts = []; // In-memory storage

// Home - List all posts
router.get('/', (req, res) => {
  res.render('index', { posts });
});

// Show form to create new post
router.get('/new', (req, res) => {
  res.render('new');
});

// Handle post creation
router.post('/new', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect('/');
});

// Show form to edit post
router.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.redirect('/');
  res.render('edit', { post });
});

// Handle post update
router.post('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect('/');
});

// Delete post
router.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

module.exports = router;
