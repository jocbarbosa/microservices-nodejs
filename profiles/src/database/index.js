const { connect } = require('mongoose');

connect(`mongodb://mongo_db:27017/profiles`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
