const { Schema, model } = require('mongoose');

const TokenSchema = new Schema(
  {
    user_id: String,
    expires_in: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Token', TokenSchema);
