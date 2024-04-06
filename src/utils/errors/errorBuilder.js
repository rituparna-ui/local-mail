module.exports = ({
  message = "Internal Server Error",
  status = 500,
  errors = ["Internal Server Error"],
} = {}) => {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  return error;
};
