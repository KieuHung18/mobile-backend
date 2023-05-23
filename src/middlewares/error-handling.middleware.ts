const logError = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const returnError = (err, req, res, next) => {
  res.json({
    error: { name: err.name, message: err.message, statusCode: err.statusCode },
  });
};

export { logError, returnError };
