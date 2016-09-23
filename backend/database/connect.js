let databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';
if (process.env.NODE_ENV === 'production') {
    databaseUrl += '?ssl=true';
}

const knex = require('knex')({
    client: 'pg',
    connection: databaseUrl
});

knex.select().from('users').then(function(result) {
    console.log(result.rows);
    return result;
})
.catch(function(err) {
    console.error(err);
});

module.exports = knex;

