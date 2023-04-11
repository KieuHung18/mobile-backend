const logError = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const returnError = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ error: { name: err.name, message: err.message } });
};

export { logError, returnError };
