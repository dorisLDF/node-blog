var express = require('express');
var router = express.Router();
var Users = require('../../db/user.js');
var svgCaptcha = require('svg-captcha');

router.use('/login', (req, res) => {
  var body = req.body;
  var yzmCode = req.session && req.session.captcha;
  if (!yzmCode) {
    res.json({
      code: 1,
      message: '请输入验证码'
    });
    return;
  }
  if (yzmCode !== body.yzmCode.toLowerCase()) {
    res.json({
      code: 1,
      message: '验证码输入错误'
    });
    return;
  }
  if (!body.phone) {
    res.json({
      code: 1,
      message: '请输入手机号'
    });
    return;
  }
  if (!body.pwd) {
    res.json({
      code: 1,
      message: '请输入密码'
    });
    return;
  }
  Users.findOne({ phone: body.phone }, function (err, data) {
    if (err) {
      res.json(err);
    } else if (data) {
      if (body.pwd !== data.pwd) {
        res.send({
          code: 1,
          message: '密码错误'
        });
      } else {
        req.session.user = data;
        res.json({
          code: 0,
          message: '登录成功'
        });
      }
    } else {
      res.json({
        code: 1,
        message: '手机号未注册'
      });
    }
  });
});

// 生成动态二维码
router.use('/getCode', (req, res) => {
  var codeConfig = {
    size: 5, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    height: 44
  }
  var captcha = svgCaptcha.create(codeConfig);
  req.session.captcha = captcha.text.toLowerCase(); // 存session用于验证接口获取文字码
  var codeData = {
    img: captcha.data
  }
  res.send(codeData);   
});
module.exports = router;
