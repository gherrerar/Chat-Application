const express = require('express');
const { Http2ServerRequest } = require('http2');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { error } = require('console');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    /*methods: ['GET', 'PATCH', 'POST', 'PUT'],
    allowedHeaders: ["my-custom-header"],
    credentials: true*/
  }
});

var clients = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'chat.html'));
});
app.use(cors());
app.use(express.static("../public"));

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');
  socket.on('disconnect', () => {
    console.log('Um usuário se desconectou');
  });
});

http.listen(port, () => {
  console.log('Server running at port ' + port);
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

  socket.on('send image', (data) => {
    console.log('Imagem enviada');
    var files = {};
    var fileAux = JSON.parse(data);
    console.log(fileAux)
    msgImg = files[fileAux.files];
    test = files[fileAux.boolean];

    socket.broadcast.emit('send image', msgImg, test);
  })

  socket.on('disconnect', () => {
    io.emit('update', clients[socket.id] + ' saiu do chat');
    delete clients[socket.id];
  });
});