const { Schema, model, Types } = require('mongoose');

const OrderSchema = new Schema(
  {
    user_id: Types.ObjectId,
    course_id: Number,
    price: {
      type: Types.Decimal128,
    },
    status: {
      type: String,
      enum: ['completed', 'processing', 'with_problem', 'pending', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Order', OrderSchema);
