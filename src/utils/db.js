// const massive = require('massive');
// const conf = require('../../config/db.config.js');

// let db;
// /*
// If you've already connected once (which is an asynchronous process and must be awaited or similar), the instance is cached so future invocations resolve synchronously.
// */
// exports = module.exports = async function () {
//   if (db) {
//     return db;
//   }
//   db = await massive({
//     host: conf.host,
//     port: conf.port,
//     database: conf.database,
//     user: conf.user,
//     password: conf.password
//   });
//   return db;
// };
