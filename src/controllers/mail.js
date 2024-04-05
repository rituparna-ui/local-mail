exports.onAuth = (auth, session, cb) => {
  cb(null, { data: {}, user: "" });
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
