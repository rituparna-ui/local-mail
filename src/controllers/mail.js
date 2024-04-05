exports.onConnect = (session, cb) => {
  cb(null);
};

exports.onMailFrom = (address, session, cb) => {
  cb();
};

exports.onRcptTo = (address, session, cb) => {
  cb();
};
