const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error. Please try again later.'
  });
};

module.exports = errorHandler;
