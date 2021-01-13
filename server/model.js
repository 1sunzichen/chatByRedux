const mongoose = require('mongoose')
const DB_URL = 'mongodb://106.13.133.210:27017/imooc -u root -p root'
mongoose.connect(DB_URL)
// mongoose.connection.on("connected",function(){
//     console.log("mongo connect success");

// })
//db.createUser({user:"root",pwd:"root",roles:[{ role: "readWriteAnyDatabase", db: "imooc" }]})

const models = {
  user: {
    user: {
      type: String,
      require: true,
    },
    pwd: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    //头像
    avatar: {
      type: String,
    },
    desc: {
      type: String,
    },
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    money: {
      type: String,
    },
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    content: { type: String, require: true, default: '' },
    read: { type: Boolean, default: false },
    create_time: { type: Number, default: Date.now },
  },
}
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  },
}
