const ApiError = require("../exceptions/api-error");

module.exports = function (error, request, response, next) {
  console.error(error);
  if (error instanceof ApiError) {
    return response
      .status(error.status)
      .json({ messsage: error.message, errors: error.errors });
  }

  return response.status(500).json({message: 'unexpected error'})
};
