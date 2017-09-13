const LocalStrategy = require('passport-local').Strategy,
  User = require('./models/user');

function configure(a) {
  a.use(new LocalStrategy(function(c, d, e) {
    User.authenticate(c, d, function(f, g) {
      f ? (console.log('Error trying to authenticate'), 
      e(f)) : g ? (console.log('Successful login!'),
      e(null, g)) : (console.log('Could not find the user'),
      e(null, !1, {
        message: 'Username or password were invalid.'
      }))
    })
  })), a.serializeUser(function(c, d) {
    d(null, c.id)
  }), a.deserializeUser(function(c, d) {
    User.findById(c, function(e, f) {
      d(e, f)
    })
  })
}
module.exports = {
  configure
};
