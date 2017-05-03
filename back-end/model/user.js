var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');

var userSchema = new Schema({
  username: { type: String, unique: true, trim: true },
  nickname: { type: String, default: '', trim: true },
  salt: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  roomlist: { type: Array, default: [] }
});

// virtual 当中的字段由 new的时候传入，但是传入的password 不会存入数据库中
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  authenticate: function(plainText) {
    return this.encryptPassword(plainText);
  }
}

var User = mongoose.model("User", userSchema);
module.exports = User;

// kittySchema.methods.speak = function () {
//   var greeting = this.name ? "Meow name is " + this.name : "I don't have name";
//   console.log(greeting);
// }

// var silence = new Kitten({name: 'Silence'});
//
// silence.save(function(err, silence) {
//   if (err) return console.error(err);
//   silence.speak();
// });
//
// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.save(function(err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });
