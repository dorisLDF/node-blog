var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/node-book', { useNewUrlParser: true });

// Schema 结构
var UserSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  pwd: { type: String, required: true },
  nickName: { type: String, required: false },
  headImg: { type: String, required: false },
  companyName: { type: String, required: false },
  instro: { type: String, required: false },
  createTime: { type: Date, required: true }
});

// model
module.exports = mongoose.model('custom', UserSchema);