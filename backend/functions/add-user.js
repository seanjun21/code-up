const pg = require('../../server.js');
const knex = require('knex')(pg);

let addUser = (data) => {
    let userName = data.input;
    
    knex.insert({ 
        user_name: userName }
    ).returning(
        'id', 
        'user_name'
    ).into(
        'users'
    ).then(
        (id, user_name) => {
            return {
                userID: id,
                userName: user_name
            };
        }
    ).catch((err) => {
        console.error(err);
    });
};

module.exports = addUser;
