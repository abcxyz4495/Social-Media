export const TryCatch = (func) => (req, res, next) =>
    func(req, res, next).catch((err) => next(err));
