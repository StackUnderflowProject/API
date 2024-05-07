var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require("dotenv").config()

var mongoose = require('mongoose').set('strictQuery', true)
var mongoDB = process.env.DB_URL

mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))



var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var footballTeamRouter = require('./routes/footballTeamRoutes')
var stadiumRouter = require('./routes/footballStadiumRoutes')
var standingRouter = require('./routes/footballStandingRoutes')
var footballMatchRouter = require('./routes/footballMatchRoutes')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

var session = require('express-session')
var MongoStore = require('connect-mongo')
const { env } = require('process')
const { strict } = require('assert')

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoDB
  })
}))

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})


app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/footballTeam', footballTeamRouter)
app.use('/footballStadium', stadiumRouter)
app.use('/footballStanding', standingRouter)
app.use('/footballMatch', footballMatchRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
