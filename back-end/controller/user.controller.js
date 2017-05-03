const mongoose = require('mongoose');
const User = require('../model/user.js');

function returnMsg(status, msg, flag) {
  return {
    status,
    msg,
    flag
  };
}

exports.messageUpdate = function (formData, host) {
  User.findOne({ username: host })
    .then(user => {
      if (user === null) {
        return returnMsg('failed', '更新聊天消息失败, 房间号：' + formData.room, false);
      } else {
        user.chatlist.forEach(item => {
          if (formData.room === item.room.toString()) {
            item.newslist.push({
              username: formData.username,
              content: formData.content,
              time: formData.time
            });
            user.save((err) => {
              if (err) {
                return returnMsg('failed', '更新聊天消息失败, 房间号：' + formData.room + host, false);
              } else {
                return returnMsg('success', '成功更新聊天消息, 房间号：' + formData.room + host, true);
              }
            });
          }
        });
      }
    });
};
