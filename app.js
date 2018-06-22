const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//Movie page control
const {movieAddDelete, movieList, movieAddPage, movieDetail, movieUpdate} = require('./routes/movie/movies');
//const movieRouter = require('./routes/movie');


const app = express();
//helper
const db = require('./helper/db')();

// view engine setup
app.engine('hbs', hbs({
  extname : "hbs", 
  defaultLayout : "layout", 
  layoutsDir: __dirname + "/views/layouts/" 
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie', movieList, movieAddDelete, movieAddPage, movieDetail, movieUpdate);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
