//import express from 'express';
const express = require('express')
const userRouter = require('./user')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const model = require('./model')
const Chat = model.getModel('chat')
const io = require('socket.io')(server)
io.on('connection', function (socket) {
  console.log('user login')
  socket.on('sendMsg', (msg) => {
    const { from, to, message } = msg
    //一开始就确认 了方向 并放入   聊天表 并发送消息
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: message }, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
      console.log(msg, 'msg', doc)
    })
  })
})
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function () {
  console.log('node app listen ao port 9093')
})
