function auth(req, res, next) {
  var user = req.session && req.session.user;
  if (req.path.indexOf('api') !== -1) {
    next();
  } else {
    if (req.path === '/login/index.html' || req.path === '/register/index.html') {
      next();
    } else {
      if (user) {
        console.log(user);
        req._userInfo = user;
        next();
      } else {
        res.redirect('/login/index.html');
      }
    }
  }
}
module.exports = auth;