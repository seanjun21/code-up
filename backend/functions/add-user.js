const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let addUser = (data) => {
    let name = data.input;
    knex.insert({
        user_name: name
    })
    .returning('id', 'user_name')
    .into('users')
    .then((id, user_name) => {
        return {
            userID: id,
            userName: user_name
        };
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = addUser;