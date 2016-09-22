const pg = require('../database/connect.js');
const knex = require('knex')(pg);

// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         database: 'chat'
//     },
// });

let addUser = (data) => {
    return new Promise((resolve, reject) => {
        let userName = data.input;
        knex.insert({ user_name: userName })
        .returning('id', 'user_name')
        .into('users')
        .then((id, user_name) => {
            resolve({ userID: id, userName: user_name });
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = addUser;
