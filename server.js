
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

let spaces = {
    lobby: [],
    2: []
};

app.use(express.static('./build'));

io.on('connection', (socket) => {
    console.log("Socket connected: " + socket.id);
    // push newly connect socket into the lobby array in the hash map
    spaces.lobby.push(socket);
    socket.on('action', (action) => {
        if (action.type === 'server/getQuestions') {
            getQuestions().then((data) => {
                // create updated username array for lobby
                let lobbyUserArr = [];
                spaces.lobby.forEach((person, index) => {
                    if (person.userName) {
                        let personObj = {
                            userName: person.userName,
                            userID: person.userID
                        };
                        lobbyUserArr.push(personObj);
                    } else {
                        let personObj = {
                            userName: `Guest User No. ${index + 1}`,
                            // TODO: Is it a security issue to have a socket.id being sent to front end?
                            userID: person.id
                        };
                        lobbyUserArr.push(personObj);
                    }
                });
                // emit updated lobby array to all sockets in lobby
                socket.emit('action', {
                    type: 'getQuestionsSuccess',
                    data: {
                        questions: data.questions,
                        curRoomOccupants: lobbyUserArr
                    }
                });
            });
        }
        if (action.type === 'server/addUser') {
            addUser(action.data).then((data) => {
                // create updated username array for lobby
                let lobbyUserArr = [];
                spaces.lobby.forEach((person, index) => {
                    // add 'userName' and userID keys to socket object and set values accordingly
                    if (socket.id === person.id) {
                        person.userName = data.userName;
                        person.userID = data.userID;
                    }
                    if (person.userName) {
                        let personObj = {
                            userName: person.userName,
                            userID: person.userID
                        };
                        lobbyUserArr.push(personObj);
                    } else {
                        let personObj = {
                            userName: `Guest User No. ${index + 1}`,
                            // Is it a security issue to have a socket.id being sent to front end?
                            userID: person.id
                        };
                        lobbyUserArr.push(personObj);
                    }
                });
                // emit updated lobby array to all sockets in lobby
                spaces.lobby.forEach((socket) => {
                    socket.emit('action', {
                        type: 'updateLobby',
                        data: {
                            curRoomOccupants: lobbyUserArr
                        }
                    });
                });
                // emit updated user info to the socket that made the dispatch
                socket.emit('action', {
                    type: 'addUserSuccess',
                    data: {
                        userName: data.userName,
                        userID: data.userID
                    }
                });
            });
        }
        if (action.type === 'server/postMessage') {
            let questionID = action.data.questionID;
            postMessage(action.data).then((data) => {
                spaces[questionID].forEach((socket) => {
                    socket.emit('action', {
                        type: 'postMessageSuccess',
                        data: data
                    });
                });
            });
        }
        if (action.type === 'server/postQuestion') {
            postQuestion(action.data).then((data) => {
                let questionID = data.questionID;
                let roomUserArr = [];
                // remove socket from lobby array and add to room array for questionID
                let lobby = spaces.lobby;
                for (let i = 0; i < lobby.length; i += 1) {
                    let item = lobby[i];
                    if (item.id === socket.id) {
                        roomUserArr.push(item);
                        lobby.splice(i, 1);
                    }
                }
                // create new 'room' in hash map for the new question
                spaces[questionID] = roomUserArr;
                // create updated username array for lobby
                let lobbyUserArr = [];
                spaces.lobby.forEach((person, index) => {
                    if (person.userName) {
                        let personObj = {
                            userName: person.userName,
                            userID: person.userID
                        };
                        lobbyUserArr.push(personObj);
                    } else {
                        let personObj = {
                            userName: `Guest User No. ${index + 1}`,
                            // Is it a security issue to have a socket.id being sent to front end?
                            userID: person.id
                        };
                        lobbyUserArr.push(personObj);
                    }
                });
                // emit updated lobby array to all sockets in lobby
                spaces.lobby.forEach((socket) => {
                    socket.emit('action', {
                        type: 'updateQuestionFeed',
                        data: { 
                            questionFeed: data.questionFeed,
                            curRoomOccupants: lobbyUserArr
                        }
                    });
                });
                // emit the question details and the room username array back to the socket that made the dispatch
                spaces[questionID].forEach((socket) => {
                    socket.emit('action', {
                        type: 'postQuestionSuccess',
                        data: {
                            questionID: data.questionID,
                            questionText: data.questionText,
                            whenAsked: data.whenAsked,
                            curRoomOccupants: roomUserArr
                        }
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

        if (action.type === 'server/joinRoom') {
            joinRoom(action.data).then((data) => {
                let questionID = data.questionID;
                // remove socket from lobby array and add to room array for questionID
                let lobby = spaces.lobby;
                for (let i = 0; i < lobby.length; i += 1) {
                    let item = lobby[i];
                    if (item.id === socket.id) {
                        spaces[questionID].push(item);
                        lobby.splice(i, 1);
                    }
                }
                // create updated username array for lobby
                let lobbyUserArr = [];
                spaces.lobby.forEach((person, index) => {
                    if (person.userName) {
                        let personObj = {
                            userName: person.userName,
                            userID: person.userID
                        };
                        lobbyUserArr.push(personObj);
                    } else {
                        let personObj = {
                            userName: `Guest User No. ${index + 1}`,
                            // Is it a security issue to have a socket.id being sent to front end?
                            userID: person.id
                        };
                        lobbyUserArr.push(personObj);
                    }
                });
                // emit updated lobby array to all sockets in lobby
                spaces.lobby.forEach((socket) => {
                    socket.emit('action', {
                        type: 'updateLobby',
                        data: {
                            curRoomOccupants: lobbyUserArr,
                        }
                    });
                });
                // create updated username array for question room
                let roomUserArr = [];
                spaces[questionID].forEach((person, index) => {
                    if (person.userName) {
                        let personObj = {
                            userName: person.userName,
                            userID: person.userID
                        };
                        roomUserArr.push(personObj);
                    } else {
                        let personObj = {
                            userName: `Guest User No. ${index + 1}`,
                            // Is it a security issue to have a socket.id being sent to front end?
                            userID: person.id
                        };
                        roomUserArr.push(personObj);
                    }
                });
                // send off data to all sockets in question room
                spaces[questionID].forEach((socket) => {
                    socket.emit('action', {
                        type: 'joinRoomSuccess',
                        data: {
                            questionText: data.questionText,
                            questionID: data.questionID,
                            messages: data.messages,
                            curRoomOccupants: roomUserArr
                        }
                    })
                });
            });
        }
    });
//when a user leaves or closes browser
    socket.on('disconnect', () => {
        // create rooms array of values (arrays) for each key in 'spaces' hash map
        let rooms = Object.keys(spaces);
        let socketToRemove = socket.id;
        // loop through array of rooms
        for (let i = 0; i < rooms.length; i += 1) {
            let room = spaces[rooms[i]];
            // loop through each room array and remove the disconnected socket when found
            for (let j = 0; j < room.length; j += 1) {
                let item = room[j];
                if (item.id === socket.id) {
                    room.splice(j, 1);
                }
            }
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
