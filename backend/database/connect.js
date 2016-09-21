const pg = require('pg');
pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL?ssl=true, function(err, client, done) {
  client.query('SELECT * FROM users', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});

module.exports = pg;


