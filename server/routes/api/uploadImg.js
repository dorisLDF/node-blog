var express = require('express');
var router = express.Router();
// var Users = require('../../db/user.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.use('/uploadImg', multipartMiddleware, (req, res) => {
  var body = req.body;
  console.log(body);
  // Users.findOne({ phone: body.phone }, function (err, data) {
  //   if (err) {
  //     res.json(err);
  //   } else if (data) {
  //     if (body.pwd !== data.pwd) {
  //       res.send({
  //         code: 1,
  //         message: '密码错误'
  //       });
  //     } else {
  //       req.session.user = data;
  //       res.json({
  //         code: 0,
  //         message: '登录成功'
  //       });
  //     }
  //   } else {
  //     res.json({
  //       code: 1,
  //       message: '手机号未注册'
  //     });
  //   }
  // });
});
module.exports = router;
