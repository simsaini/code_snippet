const router = require('express').Router(),
  mongoose = require('mongoose'),
  Client = mongoose
Snippet = require('../models/snippet');

router.get('/', (a, b) => {
    b.render('login')
  }),

  router.get('/snippet_search', authRequired, (a, b) => {
    b.render('snippet_search')
  }),

  router.get('/snippet_search/language', authRequired, (a, b) => {
    Snippet.find({
      language: a.query.language
    }).then(c => {
      b.render('snippet_search', {
        snippetLang: c
      })
    })
  }),

  router.get('/snippet_search/tags', authRequired, (a, b) => {
    Snippet.find({
      tags: a.query.tags
    }).then(c => {
      b.render('snippet_search', {
        snippetTag: c
      })
    })
  });

function authRequired(a, b, c) {
  a.user ? c() : b.redirect('/login')
}

router.get('/home', authRequired, (a, b) => {
    Snippet.find({}).then(c => {
      b.render('home', {
        snippets: c,
        username: a.user.username
      })
    })
  }),

  router.post('/snippets', (a, b) => {
    let c = new Snippet({
      title: a.body.title,
      code: a.body.code,
      notes: a.body.notes,
      language: a.body.language,
      tags: a.body.tags
    });
    c.save().then(d => {
      return console.log('posted'), d
    }), b.redirect('/home')
  }), module.exports = router;
