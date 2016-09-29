
const express = require('express');
const app = express();


const server = require('http').Server(app);
const io = require('socket.io')(server);

const getQuestions = require('./backend/functions/knex/get-questions');
const addUser = require('./backend/functions/knex/add-user');
const postQuestion = require('./backend/functions/knex/post-question');
const postMessage = require('./backend/functions/knex/post-message');
const filterQuestions = require('./backend/functions/knex/filter-questions');
const joinRoom = require('./backend/functions/knex/join-room');
const createRoomArr = require('./backend/functions/hash-map/create-room-arr');
const findSocketIdx = require('./backend/functions/hash-map/find-socket-idx');

let spaces = {
    lobby: [],
};

app.use(express.static('./build'));

io.on('connection', (socket) => {
    console.log("Socket connected: " + socket.id);
    // push newly connect socket into the lobby array in the hash map
    spaces.lobby.push(socket);
    socket.on('action', (action) => {
        if (action.type === 'server/getQuestions') {
            getQuestions().then((data) => {
                createRoomArr(lobby).then((lobbyUserArr) => {
                    // emit updated lobby array to all sockets in lobby
                    socket.emit('action', {
                        type: 'updateQuestionFeed',
                        data: {
                            questions: data.questions,
                            currentUsers: lobbyUserArr
                        }
                    });
                });
            });
        }
        if (action.type === 'server/addUser') {
            addUser(action.data).then((data) => {
                let lobby = spaces.lobby 
                lobby.forEach((person, index) => {
                    if (socket.id === person.id) {
                        person.userName = data.userName;
                        person.userID = data.userID;
                    }
                });
                createRoomArr(lobby).then((lobbyUserArr) => {            
                    // emit updated lobby array to all sockets in lobby
                    lobby.forEach((socket) => {
                        socket.emit('action', {
                            type: 'updateRoom',
                            data: {
                                currentUsers: lobbyUserArr
                            }
                        });
                    });
                    // emit updated user info to the socket that made the dispatch
                    socket.emit('action', {
                        type: 'updateUser',
                        data: {
                            user: data
                        }
                    });
                });
            });
        }
        if (action.type === 'server/postMessage') {
            postMessage(action.data).then((data) => {
                spaces[action.data.questionID].forEach((socket) => {
                    socket.emit('action', {
                        type: 'updateMessages',
                        data: data
                    });
                });
            });
        }
        if (action.type === 'server/postQuestion') {
            postQuestion(action.data).then((data) => {
                let questionID = data.questionID;
                let lobby = spaces.lobby;
                findSocketIdx(socket.id, lobby).then((idx) => {
                    let item = lobby[idx];
                    let room = [item];
                    // create new 'room' in hash map for the new question
                    spaces[questionID] = room;
                    lobby.splice(idx, 1);
                    createRoomArr(lobby).then((lobbyUserArr) => {
                        createRoomArr(room).then((roomUserArr) => {
                            // emit updated lobby array to all sockets in lobby
                            lobby.forEach((socket) => {
                                socket.emit('action', {
                                    type: 'updateQuestionFeed',
                                    data: { 
                                        questions: data.questions,
                                        currentUsers: lobbyUserArr
                                    }
                                });
                            });
                            // emit the question details and the room username array back to the socket that made the dispatch
                            room.forEach((socket) => {
                                socket.emit('action', {
                                    type: 'enterRoom',
                                    data: {
                                        currentQuestion: data.currentQuestion
                                        currentUsers: roomUserArr
                                    }
                                });
                            });
                        });
                    });
                });    
            });
        }
        if (action.type === 'server/filterQuestions') {
            filterQuestions(action.data).then((data) => {
                socket.emit('action', {
                    type: 'updateQuestionFeed',
                    data: data
                });
            });
        }
        if (action.type === 'server/joinRoom') {
            joinRoom(action.data).then((data) => {
                let questionID = data.questionID;
                let lobby = spaces.lobby;
                findSocketIdx(socket.id, lobby).then((idx) => {
                    let item = lobby[idx];
                    let room = spaces[questionID];
                    room.push(item);
                    lobby.splice(idx, 1);
                    createRoomArr(lobby).then((lobbyUserArr) => {
                        createRoomArr(room).then((roomUserArr) => {               
                            // emit updated lobby array to all sockets in lobby
                            lobby.forEach((socket) => {
                                socket.emit('action', {
                                    type: 'updateRoom',
                                    data: {
                                        currentUsers: lobbyUserArr,
                                    }
                                });
                            });
                            // send off data to all sockets in question room
                            room.forEach((socket) => {
                                socket.emit('action', {
                                    type: 'enterRoom',
                                    data: {
                                        currentQuestion: data.currentQuestion
                                        currentUsers: roomUserArr
                                    }
                                })
                            });
                        });
                    });
                });
            });
        }
    });
//when a user leaves or closes browser
    socket.on('disconnect', () => {
        // create rooms array of values (arrays) for each key in 'spaces' hash map
        let rooms = Object.keys(spaces);
        // loop through array of rooms
        for (let i = 0; i < rooms.length; i += 1) {
            let room = spaces[rooms[i]];
            findSocketIdx(socket.id, room).then((idx) => {
                if (idx !== null) {
                    room.splice(idx, 1);
                    createRoomArr(room).then((roomUserArr) => {
                        room.forEach((socket) => {
                            socket.emit('action', {
                                type: 'updateRoom',
                                data: {
                                    currentUsers: roomUserArr
                                }
                            });
                        });
                    });
                } 
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
