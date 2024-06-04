let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
require("dotenv").config()
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")

// MongoDB
let mongoose = require('mongoose').set('strictQuery', true)
const mongoDB = process.env.DB_URL

mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const adminRouter = require('./routes/adminRouter')
const eventsRouter = require('./routes/events')

const footballTeamRouter = require('./routes/football/teamRoutes')
const footballStadiumRouter = require('./routes/football/stadiumRoutes')
const footballStandingRouter = require('./routes/football/standingRoutes')
const footballMatchRouter = require('./routes/football/matchRoutes')

const handballTeamRouter = require('./routes/handball/teamRoutes')
const handballStadiumRouter = require('./routes/handball/stadiumRoutes')
const handballStandingRouter = require('./routes/handball/standingRoutes')
const handballMatchRouter = require('./routes/handball/matchRoutes')

let app = express()

// cors rules
const allowedOrigins = ['*', 'http://localhost:3000', "http://localhost:5173", "http://localhost:5174"]

app.use(cors({
    origin: 'http://20.56.20.111/',
    //methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    //credentials: true // Allow credentials (cookies, authorization headers, etc.)
}))

// Web Socket
const eventModel = require('./models/eventModel')
const jwt = require('jsonwebtoken')
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://20.56.20.111/",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
})

async function createEvent(socket, token) {
    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            socket.emit("error", {message: "JWT expired."})
            return
        } else {
            socket.emit("error", {message: "JWT verification failed."})
            return
        }
    }
    socket.broadcast.emit("new-event", "")
}

io.on("connection", (socket) => {
    socket.on("create-event", (data) => {
        createEvent(socket, data)
    })
    socket.on("delete-event", () => {
        socket.broadcast.emit("delete-event");
    })
})

server.listen(3001, () => {
    console.log("Server is running!")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static('/home/MatijaPajenk/public'))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/admins', adminRouter)
app.use('/events', eventsRouter)

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