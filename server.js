const express = require('express'),
  mustacheExpress = require('mustache-express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  passport = require('passport'),
  flash = require('express-flash-messages'),
  expressValidator = require('express-validator');

mongoose.Promise = global.Promise, mongoose.connect('mongodb://localhost:27017/code_snippets', {
  useMongoClient: !0
}).then(() => {
  console.log('database connected.')
});

const app = express();
app.use(express.static('public')),
  app.use(session({
    secret: 'anything here',
    resave: !1,
    saveUninitialized: !1
  })),

  app.use(passport.initialize()),
  app.use(passport.session()),
  app.use(flash()), require('./passportconfig').configure(passport),
  app.use(bodyParser.urlencoded({
    extended: !1
  })),
  app.use(expressValidator());
const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null,
  app.engine('mustache', mustacheExpressInstance),
  app.set('view engine', 'mustache'),
  app.set('views', __dirname + '/views'),
  app.use(require('./routes/general')),
  app.use(require('./routes/auth')),
  app.listen(3e3, function() {
    console.log('Started on port 3000')
  });
