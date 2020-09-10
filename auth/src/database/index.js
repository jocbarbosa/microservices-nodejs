const { connect } = require('mongoose');

connect(`mongodb://mongo_db:27017/auth`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
