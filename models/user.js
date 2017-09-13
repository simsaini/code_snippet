const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),

  userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: !0,
      required: !0
    },
    passwordHash: {
      type: String,
      require: !0
    }
  });

userSchema.virtual('password').get(function() {
    return null
  }).set(function(a) {
    const b = bcrypt.hashSync(a, 10);
    this.passwordHash = b
  }),
  userSchema.methods.authenticate = function(a) {
    return bcrypt.compareSync(a, this.passwordHash)
  },
  userSchema.statics.authenticate = function(a, b, c) {
    this.findOne({
      username: a
    }, function(d, e) {
      d ? (console.log('Error: static authentication failed!', d),
        c(d)) : e && e.authenticate(b) ? (console.log('Good to go!'),
        c(null, e)) : (console.log('Password was incorrect'),
        c(null, !1))
    })
  };

const User = mongoose.model('User', userSchema);
module.exports = User;
