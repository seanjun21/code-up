const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const getQuestions = require('./backend/functions/get-questions');
const addUser = require('./backend/functions/add-user');
const postQuestion = require('./backend/functions/post-question');
const postMessage = require('./backend/functions/post-message');
const filterQuestions = require('./backend/functions/filter-questions');
const joinRoom = require('./backend/functions/join-room');

const sockets = [];
const lobby = [];

app.use(express.static('./build'));

io.on('connection', (socket) => {
    // TODO: need to account for io.on disconnect
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
            addUser(action.data).then((data) => {
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
            });
        }
        if (action.type === 'server/postMessage') {
            postMessage(action.data).then((data) => {
                sockets.forEach((socket) => {
                   socket.emit('action', {
                       type: 'postQuestionSuccess',
                       data: data
                   });
                });
            });
        }
        if (action.type === 'server/postQuestion') {
            postQuestion(action.data).then((data) => {
                sockets.forEach((socket) => {
                   socket.emit('action', {
                       type: 'postMessageSuccess',
                       data: data
                   });
                });
            // TODO: Add code here to change data structure adding new key/value pair 'room#': [socket]'
            });
        }
        if (action.type === 'server/filterQuestions') {
            filterQuestions(action.data).then((data) => {
                socket.emit('action', {
                    type: 'questionFilterSuccess',
                    data: data
                });
            });
        }
        if (action.type === 'server/joinRoom') {
            joinRoom(action.data).then((data) => {
                socket.emit('action', {
                    type: 'joinRoomSuccess',
                    data: data
                });
            // TODO: Add code here to make change to sockets, removing socket from lobby array and add to array for specific room #
            });
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
