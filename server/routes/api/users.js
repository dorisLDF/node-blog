var express = require('express');
var router = express.Router();
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Users = require('../../db/user.js');

// 新增用户信息
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
        headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544873475038&di=bbf6d30e429d766348185b1162ca9e40&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft946%2F91%2F498697464%2F142250%2F9ab2bbe5%2F5527f1c3N924d02a3.jpg',
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

// 修改头像
router.use('/uploadImg', multipartMiddleware, (req, res) => {
  var img = req.files.img;
  var imgPath = 'upload/' + Date.now() + '_' + img.name;
  if (img.size > 1024 * 1024 * 2) {
    res.json({
      code: 1,
      message: '请选择小于2M的头像上传'
    });
  }
  fs.rename(img.path, imgPath, function (err) {
    if (err) {
      throw err;
    }
    Users.findOne({ phone: req._userInfo.phone }, function (err, doc) {
      if (err) {
        throw err;
      }
      doc.headImg = 'http://www.pingjinjin.com/' + imgPath.substr(7);
      doc.save(function (err, data) {
        if (err) {
          throw err;
        }
        res.json({
          code: 0,
          data: {
            headImg: doc.headImg
          }
        });
      });
    })
  })
});

// 修改用户信息（除了头像外）
router.use('/updateUser', (req, res) => {
  var body = req.body;
  Users.findOne({ phone: req._userInfo.phone }, function (err, doc) {
    if (err) {
      throw err;
    }
    // 用户名
    if (body.nickName) {
      doc.nickName = body.nickName;
    }
    // 公司
    if (body.companyName) {
      doc.companyName = body.companyName;
    }
    // 个人介绍
    if (body.instro) {
      doc.instro = body.instro;
    }
    doc.save(function (err, data) {
      if (err) {
        throw err;
      }
      res.json({
        code: 0
      });
    });
  })
});

module.exports = router;
