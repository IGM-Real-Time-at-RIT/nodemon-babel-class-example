const http = require('http');

const socketio = require('socket.io');

const fs = require('fs'); 

/** Overall data to show maintained by the server.**/
let score = 0;

const handler = (req, res) => {
  /** read our file ASYNCHRONOUSLY from the file system.
     This is much lower performance, but allows us to
     reload the page changes during development. **/
  fs.readFile(`${__dirname}/../client/index.html`, (err, data) => {
    // if err, throw it for now
    if (err) {
      throw err;
    }

    res.writeHead(200);
    res.end(data);
  });
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
