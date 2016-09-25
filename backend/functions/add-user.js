const knex = require('../database/connect.js');

let addUser = (data) => {
    return new Promise((resolve, reject) => {
        let userName = data.input;
        knex.insert({ user_name: userName })
            .returning(['id', 'user_name'])
            .into('users')
            .then((data) => {
                resolve({
                    userID: data[0].id, userName: data[0].user_name
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = addUser;
