var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/node-book', { useNewUrlParser: true });

// Schema 结构
var ArticleSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  pwd: { type: String, required: true },
  createTime: { type: Date, required: true }
});

// model
module.exports = mongoose.model('article', ArticleSchema);