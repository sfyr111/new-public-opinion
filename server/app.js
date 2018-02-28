const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./services/redis-service')

const index = require('./components/index/indexRoute')
const user = require('./components/user/userRoute')
const topic = require('./components/topic/topicRoute')
const channel = require('./components/channel/channelRoute')
const history = require('./components/history/historyRoute')

require('./services/mongoose-service')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'public'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', require('./util/proxy')) // 代理

app.use(session({
  // store: new RedisStore({ client: redisClient, logErrors: true }),
  secret: 'zzz',
  resave: false,
  saveUninitialized: true,
  name: 'MSEID',
  cookie: {
    maxAge: 366 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
}))
// app.use(session({
//   store: new RedisStore({ client: redisClient, logErrors: true }),
//   secret: 'new-public-opinion',
//   name: 'yid',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     // maxAge: 7 * 24 * 60 * 60 * 1000, // 一星期
//     maxAge: 366 * 24 * 60 * 60 * 1000, // 一分钟
//     secure: false,
//   },
// }))
app.use('*', (req, res, next) => {
  next()
})

app.use('/', index)
app.use('/user', user)
app.use('/topic', topic)
app.use('/channel', channel)
app.use('/history', history)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
