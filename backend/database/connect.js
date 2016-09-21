const pg = require('pg');
const knex = require('knex')(pg);
pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  knex.query('SELECT * FROM users', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});

module.exports = pg;


