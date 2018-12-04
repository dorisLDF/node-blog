var express = require('express');
var router = express.Router();
var Users = require('../../db/user.js');

// 插入单条用户信息
router.use('/addUsers', (req, res) => {
  var body = req.body;
  Users.findOne({ phone: body.phone }, function(err, data) {
    if (err) {
      res.json(err);
    } else if (data) {
      res.json({
        code: 1,
        message: '用户名重复'
      });
    } else {
      Users.create({
        phone: body.phone,
        pwd: body.pwd,
        createTime: new Date()
      }).then(data => {
        res.json(
          {
            code: 0,
            message: '添加数据成功'
          }
        );
      }).catch(err => {
        res.json(err);
      });
    }
  });
});
module.exports = router;
