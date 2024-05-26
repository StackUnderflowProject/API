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
const allowedOrigins = ['*', 'http://localhost:3000', "http://localhost:5173"]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}))

// Web Socket
const eventModel = require('./models/eventModel')
const jwt = require('jsonwebtoken')
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
})

async function createEvent(socket, data) {
    try {
        const decodedToken = jwt.verify(data.token, process.env.JWT_SECRET)
        data.host = decodedToken.id
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            socket.emit("error", {message: "JWT expired."})
            return
        } else {
            socket.emit("new-event", {message: "JWT verification failed."})
            return
        }
    }
    let newEvent = new eventModel(data)
    newEvent.save(function (err, event) {
        if (err) {
            socket.send("error", {message: "failed to create event"})
        }
        //socket.broadcast.emit("new-event", data);
        socket.emit("new-event", event)
    })
}

io.on("connection", (socket) => {
    socket.on("create-event", (data) => {
        createEvent(socket, data)
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
app.use(express.static(path.join(__dirname, 'public')))

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