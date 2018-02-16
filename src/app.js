const http = require('http');

const socketio = require('socket.io');

const fs = require('fs'); 

/** Overall data to show maintained by the server.**/
let score = 0;

const handler = (req, res) => {
  //check if asking for bundle and send that back
  //otherwise send back html
  if(req.url === '/bundle.js') { 
    fs.readFile(`${__dirname}/../hosted/bundle.js`, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'application/javascript'});
      res.end(data);
    });
  } else {
    fs.readFile(`${__dirname}/../hosted/index.html`, (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(data);
    });
  }
};

const app = http.createServer(handler);
app.listen(3000);

const io = socketio(app);

io.on('connection', (socket) => {
  socket.join('room1');

  socket.on('updateScore', (data) => {
    /** add to our score**/
    score += data;

    //emit to all
    io.sockets.in('room1').emit('updated', score);
  });

  //you do get a data object from this if needed
  socket.on('disconnect', () => {
    socket.leave('room1');
  });
});

console.log('listening on port 3000');
