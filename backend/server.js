import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connectDB from './config/db.js'
import errorHandler from './middlewares/errorHandler.js'
import adminRoutes from './routes/adminRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import googleAuthRoutes from './routes/googleAuthRoutes.js'
import notifRoutes from './routes/notifRoutes.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import './config/passport.js'
import passport from 'passport'

import http from 'http'
import socketio from 'socket.io'

// APP CONFIG
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// IO EVENTS
/* io.on('connection', () => {
	console.log('New websocket connection')
	io.emit('fromAPI', 'test data from server')
})
 */
app.set('socketio', io)
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// DATBASE CONNECTION
connectDB()

// ROUTES
app.get('/api', (req, res) => {
  res.send('API is running')
})
app.use('/api', userRoutes)
app.use('/api/admin', adminRoutes)

/* app.use('/auth/google', googleAuthRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use('/api/uploads', uploadRoutes)
app.use('/api/notifications', notifRoutes) */

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// SERVE STATIC ASSETS IF IN PRODUCTION - must put above clean up code

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

app.all('*', (req, res) =>
  res.status(404).send({ message: `Not found - ${req.originalUrl}` })
)

// ERROR HANDLER
app.use(errorHandler)

// PORT CONFIG
const port = process.env.PORT || 5005
server.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
})
