const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const getQuestions = require('./backend/functions/get-questions');
const addUser = require('./backend/functions/add-user');
const postQuestion = require('./backend/functions/post-question');
const postMessage = require('./backend/functions/post-message');
const filterQuestions = require('./backend/functions/filter-questions');
// const joinRoom = require('./backend/functions/join-room');

const sockets = {lobby:[]};

app.use(express.static('./build'));

io.on('connection', (socket) => {
    // TODO: need to account for io.on disconnect
    //  start with lobby, if not there loop through rooms (1-xx)
    //  loop through array in each room and for each socket stored in there, check if socket.id = the socket.id stored in array

    console.log(`Socket connected: ${socket.id}`);
    sockets.lobby.push(socket);
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
            // TODO: send back username to be stored in state in 'lobby' array. emit to everyone for update
            addUser(action.data).then((data) => {
                sockets.lobby.forEach((socket) => {
                    socket.emit('action', {
                        type: 'userEnterLobby',
                        data: data
                    });
                });
            });
        }
        if (action.type === 'server/postMessage') {
            let questionID = action.data.questionID
            postMessage(action.data).then((data) => {
                sockets[questionID].forEach((socket) => {
                   socket.emit('action', {
                       type: 'postMessageSuccess',
                       data: data
                   });
                });
            });
        }
        if (action.type === 'server/postQuestion') {
            let questionID = action.data.questionID
            sockets[questionID] = [socket]
            // TODO: remove socket from lobby
            postQuestion(action.data).then((data) => {
                sockets.lobby.forEach((socket) => {
                   socket.emit('action', {
                       type: 'postQuestionSuccess',
                       data: data
                   });
                });
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
        // TODO: pass back the username for that room and store room's occupants (add section that shows room's occuments in chatroom component and make sure we send back the user that joined the room to be stored as state also.)
        if (action.type === 'server/joinRoom') {
            let questionID = action.data.questionID
            sockets[questionID].push(socket)
            // TODO: remove socket from lobby
            joinRoom(action.data).then((data) => {
                socket[questionID].forEach((socket) => {
                    socket.emit('action', {
                      type: 'joinRoomSuccess',
                      data: data
                    });
                });
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
