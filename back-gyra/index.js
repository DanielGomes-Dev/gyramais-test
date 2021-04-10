const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const router = require('./router');
const { callbackify } = require('util');
const PORT = process.env.PORT || 3333;

const { addUser, removeUser, getUser } = require('./users');

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {

  socket.on('join', (name, callback) => {
    const { user, error } = addUser({ id: socket.id, name });
    if (error) return callback(error);
    socket.emit('message', { user: 'admin', text: `${user.name} bem vindo ao nosso chat` });
    socket.broadcast.emit('message', { user: 'admin', text: `${user.name} entrou.` })

    socket.join(user.name);

    callback();

  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      // io.emit(('message', { user: 'admin', text: `${user.name} saiu` }))
      socket.broadcast.emit('message', { user: 'admin', text: `${user.name} saiu.` })

    }
  })
});


app.use(router);

server.listen(PORT, () => {
  console.log('running on', PORT)
})