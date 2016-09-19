const express = require('express');
const app = express();

const server = require('http').Server('app');
const io = require('socket.io')(server);

const addUser = require('./backend/functions/add-user');
const postMessage = require('./backend/functions/post-message');
const postQuestion = require('./backend/functions/post-question');
const updateQuestion = require('./backend/functions/update-questions');

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
        if (action.type === 'server/updateQuestion') {
            updateQuestion(action.data).then(emit);
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