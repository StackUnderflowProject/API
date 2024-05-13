let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
require("dotenv").config()

let mongoose = require('mongoose').set('strictQuery', true)
const mongoDB = process.env.DB_URL

mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const adminRouter = require('./routes/adminRouter');

const footballTeamRouter = require('./routes/football/teamRoutes')
const footballStadiumRouter = require('./routes/football/stadiumRoutes')
const footballStandingRouter = require('./routes/football/standingRoutes')
const footballMatchRouter = require('./routes/football/matchRoutes')

const handballTeamRouter = require('./routes/handball/teamRoutes')
const handballStadiumRouter = require('./routes/handball/stadiumRoutes')
const handballStandingRouter = require('./routes/handball/standingRoutes')
const handballMatchRouter = require('./routes/handball/matchRoutes')


let app = express()

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
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", ["PUT", "POST", "PATCH", "DELETE", "GET"])
    return res.status(200).json({})
  }
  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/admins', adminRouter)

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
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app