const ProfileService = require('./services/profile');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

module.exports = {
  async authenticate({ request }, callback) {
    const { email, password } = request;

    const response = await new Promise((resolve, reject) => {
      ProfileService.getUserByEmail(
        {
          email,
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        }
      );
    });

    const { user } = response;

    if (!user) {
      return callback('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return callback('Email or password incorrect');
    }

    const token = sign({}, 'asdasdasd', {
      expiresIn: '1h',
      subject: user._id,
    });
    console.log({ token });
    return callback(null, { token });
  },

  async register({ request }, callback) {
    const { name, email, password } = request;
    console.log(name, email, password);
    const userExistsResponse = await new Promise((resolve, reject) => {
      ProfileService.getUserByEmail({ email }, (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    });

    const { user } = userExistsResponse;
    console.log(user);
    if (user) {
      return callback('User already registered', null);
    }

    const response = await new Promise((resolve, reject) => {
      ProfileService.createUser(
        {
          name,
          email,
          password,
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        }
      );
    });

    const { user: u } = response;
    console.log(u);

    return callback(null, { user: u });
  },
};
