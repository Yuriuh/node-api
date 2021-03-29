const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '请添加名字'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, '请填写邮箱'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '请填写正确的邮箱地址',
    ],
  },
  password: {
    type: String,
    required: [true, '请添加密码'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'visitor'],
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', UserSchema)
