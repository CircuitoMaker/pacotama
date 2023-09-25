var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var verificaLoginRouter = require('./routes/verificaLogin');
var cadastroRouter = require('./routes/cadastro');
var cadastraPacotesRouter = require('./routes/cadastraPacotes');
var excluiPacoteRouter = require('./routes/excluiPacote');
var excluiUserRouter = require('./routes/excluiUser');
var entregueRouter = require('./routes/entregue');
var registroRouter = require('./routes/registro');
var detalhesRouter = require('./routes/detalhes');
var entreguesRouter = require('./routes/entregues');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');

var lofiRouter = require('./routes/lofi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret:"PACOTAMA",
resave: true,
saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/verificaLogin', verificaLoginRouter);
app.use('/cadastro', cadastroRouter);
app.use('/cadastraPacotes', cadastraPacotesRouter);
app.use('/excluiPacote', excluiPacoteRouter);
app.use('/excluiUser', excluiUserRouter);
app.use('/entregue', entregueRouter);
app.use('/registro', registroRouter);
app.use('/detalhes', detalhesRouter);
app.use('/entregues', entreguesRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);

app.use('/lofi', lofiRouter);

//inicia a API
require('./public/api/api');


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



module.exports = app;
