const express = require('express');
const app = express();

const server = require('http').Server('app');
const io = require('socket.io')(server);

const addUser = require('./backend/functions/add-user');
const postMessage = require('./backend/functions/post-message');
const postQuestion = require('./backend/functions/post-question');
const filterQuestions = require('./backend/functions/filter-questions');
const pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

const sockets = [];

app.use(express.static('./build'));

let emit = (data) => {
    sockets.forEach((socket) => {
       socket.emit('action', {
           type: 'update',
           data: data
       });
    });
};

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    sockets.push(socket);
    socket.on('action', (action) => {
        if (action.type === 'server/addUser') {
            addUser(action.data).then(emit);
        }
        if (action.type === 'server/postMessage') {
            postMessage(action.data).then(emit);
        }
        if (action.type === 'server/postQuestion') {
            postQuestion(action.data).then(emit);
        }
        if (action.type === 'server/filterQuestions') {
            filterQuestions(action.data).then(emit);
        }
    });
});

function runServer(callback) {
    let PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(`Listening on localhost: ${PORT}`);
        if (callback) {
            callback();
        }
    });
}

if (require.main === module) {
    runServer((err) => {
        if (err) {
            throw new Error(err);
        }
    });
}