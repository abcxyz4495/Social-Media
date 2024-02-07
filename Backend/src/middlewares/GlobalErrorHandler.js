export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode ||= 400;
  err.message ||= "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch = (func) => (req, res, next) =>
  func(req, res, next).catch((err) => next(err));

