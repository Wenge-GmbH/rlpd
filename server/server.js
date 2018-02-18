const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3002;

const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const log = require('./socket-events/log');
const logRoutes = require('./controllers/log');
const auth = require('./controllers/auth');

const publicPath = path.join(__dirname, '/public');

server.listen(port, () => {
  console.log(`server is started on port ${port}`);
})

app.use(express.static(publicPath));
app.use(bodyParser.json({ type: '*/*' }));
app.use(morgan('combined'));
app.use(cors());

app.get('/log/:path', auth.validateToken, logRoutes.log);
app.post('/login', auth.login);

io.on('connection', socket => {
  let currentPlate = 'no plate yet';
  console.log('client connected', socket.client.id);

  socket.on('log-error', log.error);
  socket.on('log-success', log.success);
  socket.on('show-success', (data) => {
    currentPlate = data;
    socket.broadcast.emit('current-plate', currentPlate);
  })
})

// console.log(new Date(1518956568317 + (1*60*60*1000)));
