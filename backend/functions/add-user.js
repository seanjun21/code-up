const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'code-roulette'
    }
});

let addUser = (data) => {
    let name = data.input;
    knex.insert({
        name: name
    })
    .returning('id', 'name')
    .into('users')
    .then((id, name) => {
        return {
            id: id,
            name: name
        };
    })
    .catch((err) => {
        console.error(err);
    })
};

module.exports = addUser;