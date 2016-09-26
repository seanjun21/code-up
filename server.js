
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

let spaces = {
    lobby: []
};

app.use(express.static('./build'));

io.on('connection', (socket) => {

    // console.log("socket------->");
    // console.log(socket);
    // console.log(`Socket connected: ${socket.id}`);

    spaces.lobby.push(socket);
    socket.on('action', (action) => {

        if (action.type === 'server/getQuestions') {
            getQuestions().then((data) => {
                let userNameArr = [];
                spaces.lobby.forEach((person, index) => {
                    if (person.userName) {
                        let personObj = {
                            userName: person.userName,
                            userID: person.userID
                        };
                        userNameArr.push(personObj);
                    } else {
                        let personObj = {
                            userName: `Guest User No. ${index + 1}`,
                            // Is it a security issue to have a socket.id being sent to front end?
                            userID: person.id
                        };
                        userNameArr.push(personObj);
                    }
                });
                socket.emit('action', {
                    type: 'getQuestionsSuccess',
                    data: {
                        questions: data.questions,
                        lobby: userNameArr
                    }
                });
            });
        }
        if (action.type === 'server/addUser') {
            // TODO: send back username to be stored in state in 'lobby' array. emit to everyone for update
            addUser(action.data).then((data) => {
                let userNameArr = [];
                spaces.lobby.forEach((person, index) => {
                    if (socket.id === person.id) {
                        person.userName = data.userName;
                        person.userID = data.userID;
                    }
                    if (person.userName) {
                        let personObj = {
                            userName: person.userName,
                            userID: person.userID
                        };
                        userNameArr.push(personObj);
                    } else {
                        let personObj = {
                            userName: `Guest User No. ${index + 1}`,
                            // Is it a security issue to have a socket.id being sent to front end?
                            userID: person.id
                        };
                        userNameArr.push(personObj);
                    }
                });
                console.log(userNameArr, '<<<<<<<userNameArr');

                spaces.lobby.forEach((socket) => {
                    socket.emit('action', {
                        type: 'userEnterLobby',
                        data: userNameArr
                    });
                });
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
            let questionID = action.data.questionID;
            spaces[questionID] = [socket];

            let lobby = spaces[lobby];
            for (let j = 0; j < lobby.length; j += 1) {
                let roomSock = lobby[j];
                // console.log('Room Socket ----> ', roomSock.id);
                // console.log('Socket to delete ----> ', socket.id);
                if (lobbySock.id === socket.id) {
                    lobby.splice(j, 1);
                }
            }

            postQuestion(action.data).then((data) => {
                spaces.lobby.forEach((socket) => {
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
            let questionID = action.data.questionID;
            spaces[questionID].push(socket);

            let lobby = spaces[lobby];
            for (let j = 0; j < lobby.length; j += 1) {
                let roomSock = lobby[j];
                // console.log('Room Socket ----> ', roomSock.id);
                // console.log('Socket to delete ----> ', socket.id);
                if (lobbySock.id === socket.id) {
                    lobby.splice(j, 1);
                }
            }

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
//when a user leaves or closes browser
    socket.on('disconnect', () => {
        var rooms = Object.keys(spaces);
        var socketToRemove = socket.id;

        for (let i = 0; i < rooms.length; i += 1) {
            let room = spaces[rooms[i]];
            // console.log(`room ${rooms[i]} ----> `, room );
            for (let j = 0; j < room.length; j += 1) {
                let roomSock = room[j];
                // console.log('Room Socket ----> ', roomSock.id);
                // console.log('Socket to delete ----> ', socket.id);
                if (roomSock.id === socket.id) {
                    room.splice(j, 1);
                }
            }
            // console.log(`${rooms[i]} ----> `, room )
        }

    });
});

function runServer(callback) {
    let PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        // console.log(`Listening on localhost: ${PORT}`);
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
