var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/node-book', { useNewUrlParser: true });

// Schema 结构
var ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  conetent: { type: String, required: true },
  author: { type: String, required: false }
  
  // companyName: { type: String, required: false },
  // instro: { type: String, required: false },
  // createTime: { type: Date, required: true }
});

// model
module.exports = mongoose.model('article', ArticleSchema);