exports.onAuth = (auth, session, cb) => {
  cb(null, { data: null, user: null });
};

exports.onConnect = (session, cb) => {
  cb(null);
};

exports.onMailFrom = (address, session, cb) => {
  cb();
};

exports.onRcptTo = (address, session, cb) => {
  cb();
};
