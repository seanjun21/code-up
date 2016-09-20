const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let addUser = (data) => {
    let name = data.input;

    knex.insert({
        username: name
    })
    .returning('id', 'user_name')
    .into('users')
    .then((user_id, username) => {
        return {
            userID: user_id,
            userName: username
        };
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = addUser;