
const knex = require('../database/connect.js');

// data = "Alex";

let loginUser = (data) => {
    return new Promise((resolve, reject) => {
      console.log('Log in user')
        let userName = data.input;
        knex.select({ user_name: userName })
            .from('users')
            .returning(['id', 'user_name'])
            .then((data) => {
                resolve({
                    userID: id, userName: user_name
                });
                console.log(userID, userName, "userID, userName")
            })
            .catch((err) => {
                reject(err);
            });
    });
};

module.exports = loginUser;
