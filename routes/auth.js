const router = require('express').Router(),
  User = require('../models/user'),
  passport = require('passport');

router.get('/login', (a, b) => {
    const c = b.locals.getMessages();
    console.log('flash', c), c.error ? b.render('login', {
      showErrors: !0,
      errors: c.error
    }) : b.render('login')
  }),

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: !0
  })),

  router.get('/register', (a, b) => {
    const c = b.locals.getMessages();
    c.error ? b.render('register', {
      showErrors: !0,
      errors: c.error
    }) : b.render('register')
  }),

  router.post('/register', (a, b, c) => {
      a.checkBody('username', 'Username is required.').notEmpty(),
        a.checkBody('password', 'Password is required.').notEmpty(),
        a.getValidationResult().then(d => {
          if (!1 === d.isEmpty())
            d.array().forEach(e => {
              a.flash('error', e.msg)
            }), b.redirect('/register');
          else {
            const e = new User({
              username: a.body.username,
              password: a.body.password
            });
            e.save(f => {
              f ? (-1 < f.message.indexOf('duplication error!') ?
                a.flash('error', 'Username already use!') :
                a.flash('error', 'There was a problem registering!'),
                b.redirect('/register')) : c()
            })
          }
        })
    },

    passport.authenticate('local', {
      successRedirect: '/home'
    })),

  router.get('/logout', (a, b) => {
    a.logout(), b.redirect('/login')
  }),

  module.exports = router;
