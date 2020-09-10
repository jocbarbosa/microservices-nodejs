const User = require('./schemas/User');

module.exports = {
  async getUserById({ request }, callback) {
    try {
      const { id } = request;

      const user = await User.findById(id);

      callback(null, { user });
    } catch (error) {
      callback(error);
    }
  },
  async getUserByEmail({ request }, callback) {
    try {
      const { email } = request;
      console.log({ email });
      const user = await User.findOne({ email });
      console.log(user);

      callback(null, { user });
    } catch (error) {
      callback(error);
    }
  },
  async createUser({ request }, callback) {
    try {
      const { name, email, password } = request;
      console.log({ name, email, password });

      const user = await User.create({ name, email, password });
      console.log(user);

      callback(null, { user });
    } catch (error) {
      callback(error);
    }
  },
  async updateUser({ request }, callback) {
    try {
      const { id, name, email, password } = request;

      const user = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );

      callback(null, { user });
    } catch (error) {
      callback(error);
    }
  },
  async destroyUser({ request }, callback) {
    try {
      const { id } = request;

      await User.findByIdAndDelete(id);

      callback(null, {});
    } catch (error) {
      callback(error);
    }
  },
};
