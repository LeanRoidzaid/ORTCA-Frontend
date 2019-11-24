var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exppress_session=require('express-session')
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuarios');
var benefRouter = require('./routes/beneficiarios');
var homeRouter  = require('./routes/home');


var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/beneficiarios',benefRouter);
app.use('/home',homeRouter);

app.use(exppress_session({
  secret: 'elaiss',
  resave: false,
  saveUninitialized: true
}))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.all('*', function (req, res) {
  res.sendFile(__dirname+'/views/*.*') /* <= Where my ng-view is located */
})
module.exports = app;
