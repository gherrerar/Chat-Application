const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var clients = {};

app.get('/', (req, res,) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'chat.html'));
});
app.use(express.static("../public"));

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
  socket.on('disconnect', () => {
    console.log('Um usuário se desconectou');
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {

  socket.on('join', function(name){
    console.log('Entrou: ' + name);
    clients[socket.id] = name;
    socket.emit('update', 'Você se conectou ao chat');
    socket.broadcast.emit('update', name + ' entrou no chat');
  });

  socket.on('chat message', (msg) => {
    console.log('Mensagem: ' + msg);
    socket.broadcast.emit('chat message', clients[socket.id], msg);
  });

  socket.on('disconnect', () => {
    io.emit('update', clients[socket.id] + ' saiu do chat');
    delete clients[socket.id];
  });
});
