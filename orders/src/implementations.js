const Order = require('./schemas/Order');

module.exports = {
  async listOrders({ request }, callback) {
    try {
      const { user_id } = request;

      const orders = await Order.find({ user_id });

      callback(null, { orders });
    } catch (error) {
      callback(error);
    }
  },
  async createOrder({ request }, callback) {
    try {
      const { user_id, course_id, price } = request;

      const order = await Order.create({ user_id, course_id, price });

      callback(null, order);
    } catch (error) {
      callback(error);
    }
  },
  async cancelOrder({ request }, callback) {
    try {
      const { id } = request;

      const order = await Order.findByIdAndUpdate(
        id,
        { status: 'cancelled' },
        { new: true }
      );

      callback(null, { order });
    } catch (error) {
      callback(error);
    }
  },
};
