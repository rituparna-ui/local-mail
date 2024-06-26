const bcrypt = require("bcryptjs");
const { simpleParser } = require("mailparser");

const User = require("./../models/user");
const Mail = require("./../models/mail");

exports.onAuth = async (auth, session, cb) => {
  const { username: email, password } = auth;
  const user = await User.findOne({ email, isDeleted: false }).select(
    "+password"
  );
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
  const body = [];
  stream.on("data", (data) => {
    body.push(data);
  });
  stream.on("end", async () => {
    const concatResult = Buffer.concat(body).toString();
    const parsedMail = await simpleParser(concatResult);
    await Mail.create(parsedMail);
    cb();
  });
};
