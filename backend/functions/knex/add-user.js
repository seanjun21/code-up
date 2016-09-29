const knex = require('../database/connect.js');

let addUser = (data) => {
    return new Promise((resolve, reject) => {
        let userName = data.input;
        knex.insert({ user_name: userName })
            .returning(['user_name', 'id'])
            .into('users')
            .then((data) => {
                resolve({
                    userName: data[0].user_name, userID: data[0].id
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = addUser;
