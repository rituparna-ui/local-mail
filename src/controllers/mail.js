const bcrypt = require("bcryptjs");

const User = require("./../models/user");

exports.onAuth = async (auth, session, cb) => {
  const { username: email, password } = auth;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return cb("Invalid Email or Password", null);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return cb("Invalid Email or Password", null);
  }

  return cb(null, { user: { email } });
};

exports.onConnect = (session, cb) => {
  cb(null);
};

exports.onMailFrom = (address, session, cb) => {
  cb(null);
};

exports.onRcptTo = (address, session, cb) => {
  cb(null);
};

exports.onData = (stream, session, cb) => {
  stream.on("data", (data) => {
    console.log(data.toString());
  });
  stream.on("end", cb);
};
