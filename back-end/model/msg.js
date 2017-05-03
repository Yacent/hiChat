var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * newslist: {
 *  username: String,
 *  news: String,
 *  time: Date,
 *  isGroup: Boolean
 *  type: 0
 *  isSelf: Boolean
 * }
 */

var msgSchema = new Schema({
  room: { type: String, default: '' },
  type: { type: Boolean, default: false }, // 房间类型，group 为 true, 单聊为 false
  newslist: { type: Array, default: [] },
  userlist: { type: Array, default: []}
  // unReadNumber: { type: Number, default: 0},   // 标记未读消息的数目
  // isOnline: { type: Boolean, default: false } // true 为在当前房间，false为不在当前房间
});

var Msg = mongoose.model("Msg", msgSchema);
module.exports = Msg;
