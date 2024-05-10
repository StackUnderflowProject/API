var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require("dotenv").config()

var mongoose = require('mongoose').set('strictQuery', true)
var mongoDB = process.env.DB_URL
// console.log(mongoDB)

mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var footballTeamRouter = require('./routes/football/teamRoutes')
var footballStadiumRouter = require('./routes/football/stadiumRoutes')
var footballStandingRouter = require('./routes/football/standingRoutes')
var footballMatchRouter = require('./routes/football/matchRoutes')

var handballTeamRouter = require('./routes/handball/teamRoutes')
var handballStadiumRouter = require('./routes/handball/stadiumRoutes')
var handballStandingRouter = require('./routes/handball/standingRoutes')
var handballMatchRouter = require('./routes/handball/matchRoutes')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requsted-Width, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT", "POST", "PATCH", "DELETE", "GET")
    return res.status(200).json({})
  }
  next()
})

const { env } = require('process')
const { strict } = require('assert')


app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use('/footballTeam', footballTeamRouter)
app.use('/footballStadium', footballStadiumRouter)
app.use('/footballStanding', footballStandingRouter)
app.use('/footballMatch', footballMatchRouter)

app.use('/handballTeam', handballTeamRouter)
app.use('/handballStadium', handballStadiumRouter)
app.use('/handballStanding', handballStandingRouter)
app.use('/handballMatch', handballMatchRouter)

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
