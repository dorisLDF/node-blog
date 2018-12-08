var Users = require('../../db/user.js');

function auth(req, res, next) {
  var user = req.session && req.session.user;
  Users.findOne({ _id: user && user._id }, function (err, data) {
    if (err) {
      throw err;
    }
    req._userInfo = data;
    if (req.path.indexOf('api') !== -1) {
      next();
    } else {
      if (req.path === '/login/index.html' || req.path === '/register/index.html') {
        next();
      } else {
        if (data) {
          next();
        } else {
          res.redirect('/login/index.html');
        }
      }
    }
  });
}
module.exports = auth;