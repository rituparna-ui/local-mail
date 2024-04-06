module.exports = async (req, res, next) => {
  return res.status(404).json({
    message: "Not Found",
    status: 404,
  });
};
