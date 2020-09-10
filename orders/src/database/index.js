const { connect } = require('mongoose');

connect(`mongodb://localhost:27017/orders`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
