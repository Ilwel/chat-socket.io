require('dotenv').config()
const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log('[IO] a new connection');
  socket.on('chat.message', data => {
    console.log(`[SOCKET] new message -> ${data.author}: ${data.message}`);
    console.log(data);
    io.emit('chat.message', data);
  })
  socket.on('disconnect', () => console.log('[SOCKET] disconnect'));

})

server.listen(process.env.PORT, () => {
  console.log('servidor aberto')
})