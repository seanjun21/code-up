const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const getQuestions = require('./backend/functions/get-questions');
const addUser = require('./backend/functions/add-user');
const postQuestion = require('./backend/functions/post-question');
const postMessage = require('./backend/functions/post-message');
const filterQuestions = require('./backend/functions/filter-questions');

// /* postgres connection */
// const pg = require('pg');
// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');
//
//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });
// /*end postgres connection*/

const sockets = [];
const lobby = [];

app.use(express.static('./build'));

let emitGetQuestions = (data) => {
  socket.emit('action', {
    type: 'getQuestionsSuccess',
    data: data
  });
};

let emitNewUser = (data) => {
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
            getQuestions(action.data).then(emitGetQuestions);
        }
        if (action.type === 'server/addUser') {
            addUser(action.data).then(emitNewUser);
        }
        if (action.type === 'server/postMessage') {
            postMessage(action.data).then(emitNewQuestion);
        }
        if (action.type === 'server/postQuestion') {
            postQuestion(action.data).then(emitNewMessage);
        }
        if (action.type === 'server/filterQuestions') {
            filterQuestions(action.data).then(emitFilterQuestions.bind(null, socket));
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
//
// module.exports = pg;
