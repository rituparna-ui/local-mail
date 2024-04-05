module.exports = async (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || 500,
    errors: err.errors || [],
  });
};
