var jwt = require('../utils/jwt.js');
import getConnection from '../utils/db';

module.exports = async function isAuthenticated(req, res, next) {
  var {sessionId} = req.cookies;
  if (sessionId || (req && req.headers && req.headers.authorization)) {
    const token = req.headers.authorization || sessionId;
    let payload = jwt.verify(token);
    if (payload) {
      const {id} = payload;
      const db = await getConnection();
      const users = await db.users.find({id: id});
      console.log(users[0])
      req.user = users[0];
      next();
    }
    else {
      next({status: 401, error: "Unauthorized Access"})
    }
  }
  else {
    next({status: 401, error: "Unauthorized Access"})
  }
}
