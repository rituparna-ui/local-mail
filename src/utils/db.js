const mongoose = require("mongoose");

module.exports = ({ uri = "mongodb://localhost:27017/localmail" } = {}) => {
  return mongoose.connect(uri);
};
