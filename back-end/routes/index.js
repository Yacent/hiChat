const express = require('express');
const router = express.Router();
// const dirname = require('../hei');

const mongoose = require('mongoose');
const User = require('../model/user.js');
const Msg = require('../model/msg.js');

const multer = require('multer');
const upload = multer();

function returnMsg(status, msg, flag) {
  return {
    status,
    msg,
    flag
  };
}

/**
 * Login Module
 * body当中需要传入
 *  username
 *  password
 *
 * @param req.session.user 用于存储当前用户的相关信息
 *
 * @return {returnMsg}
 */
router.post('/', upload.array(), (req, res) => {
  let formData = req.body;
  req.session.user = null;  // 记得删掉
  User.findOne({username: formData.username}, (err, user) => {
    if (user === null) {
      return res.send(returnMsg('login failed', '用户名或者密码错误，请检查', false));
    } else {
      let tmp = new User({
        salt: user.salt
      });
      if (formData.username !== user.username || tmp.authenticate(formData.password) !== user.hashed_password) {
        return res.send(returnMsg('login failed', '用户名或者密码错误，请检查', false));
      } else {
        req.session.user = user;
        return res.send(returnMsg('login success', '登陆成功', true));
      }
    }
  });
});

/**
 * Register Module
 * body当中需要传入
 *  username
 *  password
 *  nickname
 *
 * @return {returnMsg}
 */
router.post('/register', upload.array(), (req, res) => {
  let formData = req.body;
  let user = new User({
    username: formData.username,
    password: formData.password,
    nickname: formData.nickname
  });
  user.save((err, item) => {
    if (err) {
      return res.send(returnMsg('register failed', '用户名已注册', false));
    } else {
      req.session.user = user;
      return res.send(returnMsg('register success', '用户成功注册', true));
    }
  });
});

/**
 * Get Recently Chat News
 *
 * @param username
 *
 * @return {returnMsg} 返回 user 和 所有消息列表
 */
router.get('/home', (req, res) => {
  if (req.session.user) {
    User.findOne({ username: req.session.user.username })
      .then(user => {
        if (user.roomlist.length > 0) {
          let promises = user.roomlist.map(roomNum => {
            return Msg.findOne({ room: roomNum.room });
          });
          Promise.all(promises)
            .then(posts => {
              if (posts[0] === null) {
                return res.send(returnMsg('failed', '没有任何聊天记录', false));
              }
              return res.send(returnMsg('success', { user, posts }, true));
            }).catch(reason => {
              console.log(reason);
            });
        } else {
          return res.send(returnMsg('failed', '没有任何聊天记录', false));
        }
      });
  } else {
    return res.send(returnMsg('failed', '请完成用户登陆', false));
  }
});

/**
 * Get Contacts List
 *
 * @return {returnMsg} 返回 user
 *  不论是谁查，都返回所有的联系人
 */
router.get('/contacts', (req, res) => {
  if (req.session.user) {
    User.find({})
    .then(user => {
      let userlist = [];
      if (user.length <= 0) {
        return res.send(returnMsg('failed', '查询联系人列表失败', false));
      } else {
        for (let item of user) {
          if (item.username == req.session.user.username) {
            continue;
          }
          userlist.push({
            username: item.username,
            nickname: item.nickname
          })
        };
        return res.send(returnMsg('success', {
          userlist,
          user: req.session.user
        }, true));
      }
    });
  }
});

/**
 * Get userlist before create the chatting room
 *
 * @return {returnMsg} 返回 user
 *  不论是谁查，都返回所有的可加入到房间的联系人，除了自己
 */
 router.get('/addUser', (req, res) => {
   if (req.session.user) {
     User.find({})
     .then(user => {
       let userlist = [];
       if (user.length <= 0) {
         return res.send(returnMsg('failed', '查询联系人列表失败', false));
       } else {
         for (let item of user) {
           if (item.username == req.session.user.username) {
             continue;
           }
           userlist.push({
             username: item.username,
             nickname: item.nickname
           })
         };
         return res.send(returnMsg('success', userlist, true));
       }
     });
   }
 });

 /**
  * Get User Information to show in the card
  *
  * @return {returnMsg} 返回 user
  *  返回当前查询者的用户信息
  */
router.get('/userInfo/:username', (req, res) => {
  if (req.session.user) {
    if (req.params.username === req.session.user.username) {
      return res.send(returnMsg('success', req.session.user.nickname, true));
    } else {
      User.findOne({ username: req.params.username })
        .then(user => {
          if (user == null) {
            return res.send(returnMsg('failed', '不存在该用户', false));
          } else {
            return res.send(returnMsg('success', user.nickname, true));
          }
        })
    }
  }
})

/**
 * Create A Room For Chat   groupChat | one2oneChat
 * @param username  the host of the room
 *
 * @return {returnMsg}
 *
 * 每次创建房间的时候需要计算当前所有的房间的数量，以增加roomNum
 * 并且根据userlist在user的roomlist当中插入房间号
 */
router.post('/createRoom', upload.array(), (req, res) => {
  let formData = req.body;
  let selfInfo = {
    username: req.session.user.username,
    nickname: req.session.user.nickname
  };
  let userlist = [selfInfo, ...formData.userlist];
  let roomType = userlist.length > 2 ? true : false;
  if (!formData.room) {
    return res.send(returnMsg('create failed', '房间创建失败', false));
  }
  let msg = new Msg({
    room: formData.room,
    type: roomType,
    userlist
  });
  msg.save((err, room) => {
    if (err) {
      console.log(err);
      return res.send(returnMsg('create failed', '房间创建失败', false));
    } else {
      let promises = userlist.map(user => {
        return User.findOneAndUpdate(
          { username: user.username },
          { $push: {
            'roomlist': {
              room: formData.room,
              unReadNews: 0
            }
          }}
        );
      });
      Promise.all(promises)
      .then(posts => {
        if (posts[0] === null) {
          return res.send(returnMsg('create failed', '房间创建失败', false));
        }
        return res.send(returnMsg('create success', '房间创建成功', true));
      }).catch(reason => {
        console.log(reason);
      });
    }
  });
});

/**
 * Update News List
 * @param roomNum
 *
 * @return {returnMsg}
 *
 * 查询到房间号之后，增添一条消息到房间的消息列表当中
 */
router.post('/updateMsg/:room', upload.array(), (req, res) => {
  let formData = req.body;
  Msg.findOneAndUpdate(
    { room: req.params.room },
    { $push: { 'newslist': {
        username: formData.username,
        type: formData.type,
        news: formData.news,
        time: formData.time,
        nickname: formData.nickname,
        isGroup: formData.isGroup,
        isSelf: true
      }}
    },
    function(err, room) {
      if (err || room === null) {
        return res.send(returnMsg('failed', '更新聊天记录失败', false));
      } else {
        return res.send(returnMsg('success', '成功上传聊天记录，房间号：' + req.params.room, true));
      }
    }
  );
});

/**
 * Get News List of the room
 * @param roomNum
 *
 * @return {returnMsg}
 *
 * 查询到房间号之后，将数据库中的已存信息返回
 */
 router.get('/getInitmsg/:room', upload.array(), (req, res) => {

   Msg.findOne({ room: req.params.room})
    .then(room => {
      if (room === null) {
        return res.send(returnMsg('failed', '暂时没有聊天记录', false));
      }
      return res.send(returnMsg('success', {
        room,
        user: req.session.user
      }, true));
    })
 });

 /**
  * Update the unReadNews of room
  * @param roomNum
  *
  * @return {returnMsg}
  *
  * 查询到房间号之后，将数据库中的已存信息返回
  */
 router.post('/updateUnread', upload.array(), (req, res) => {
   let room = req.body.room;
   let currentLength = req.body.currentLength;

   User.findOneAndUpdate(
     {
       username: req.session.user.username,
       'roomlist.room': room
     },
     { $set: { 'roomlist.$.unReadNews': currentLength }},
     function(err, room) {
       if (err || room === null) {
         return res.send(returnMsg('failed', '更新上次已读长度失败', false));
       } else {
         return res.send(returnMsg('success', '成功更新上次已读长度', true));
       }
     }
   )
 })

module.exports = router;
