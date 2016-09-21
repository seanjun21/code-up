const pg = require('pg');
const knex = require('knex')(pg);
pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  knex.select().from('users').then(function(result) {
    return result
    console.log(result.rows);
  })
  .catch(function(err) {
  	console.error(err);
  })
})

module.exports = pg;


