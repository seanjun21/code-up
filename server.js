const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const getQuestions = require('./backend/functions/get-questions');
const addUser = require('./backend/functions/add-user');
const postQuestion = require('./backend/functions/post-question');
const postMessage = require('./backend/functions/post-message');
const filterQuestions = require('./backend/functions/filter-questions');

const sockets = [];
const lobby = [];

app.use(express.static('./build'));

let emitNewUser = (socket, data) => {
    lobby.push(data.userName)
    socket.emit('action', {
        type: 'addUserSuccess',
        data: data
    });
    sockets.forEach((socket) => {
        socket.emit('action', {
            type: 'userEnterLobby',
            data: {lobby: lobby}
        });
    });
};

let emitNewQuestion = (data) => {
    sockets.forEach((socket) => {
       socket.emit('action', {
           type: 'postQuestionSuccess',
           data: data
       });
    });
};

let emitNewMessage = (data) => {
    sockets.forEach((socket) => {
       socket.emit('action', {
           type: 'postMessageSuccess',
           data: data
       });
    });
};
// returns to specific unique socket - apply to other emit functions
let emitFilterQuestions = (socket, data) => {
    socket.emit('action', {
        type: 'questionFilterSuccess',
        data: data
    });
};

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    sockets.push(socket);
    socket.on('action', (action) => {
        if (action.type === 'server/getQuestions') {
            getQuestions().then((data) => {
                socket.emit('action', {
                    type: 'getQuestionsSuccess',
                    data: data
                });
            });
        }
        if (action.type === 'server/addUser') {
            lobby.push(data.userName)
            socket.emit('action', {
                type: 'addUserSuccess',
                data: data
            });
            sockets.forEach((socket) => {
                socket.emit('action', {
                    type: 'userEnterLobby',
                    data: {lobby: lobby}
                });
            });
            addUser(action.data).then(emitNewUser).bind(null, socket);
        }
        // if statement for joinRoom (room for question that's not your own)
            // make change to sockets, remove from lobby array and add to array for specific room #
        if (action.type === 'server/postMessage') {
            postMessage(action.data).then(emitNewQuestion);
        }
        if (action.type === 'server/postQuestion') {
            postQuestion(action.data).then(emitNewMessage);
            // change data structure adding new key/value pair 'room#(key): [socket]'
        }
        if (action.type === 'server/filterQuestions') {
            filterQuestions(action.data).then(emitFilterQuestions.bind(null, socket));
        }
        // need to account for io.on disconnect
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
