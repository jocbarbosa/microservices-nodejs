const { promisify } = require('util');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },
};

UserSchema.statics = {
  generateToken({ _id }) {
    return jwt.sign({ _id }, 'keypasswordsupersecret', { expiresIn: '1d' });
  },
  authenticate(token) {
    return promisify(jwt.verify)(token, 'keypasswordsupersecret');
  },
};

module.exports = model('User', UserSchema);
