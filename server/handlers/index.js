import * as authHandlers from "./auth.js";
import * as pollHandlers from "./poll.js";

export { authHandlers, pollHandlers };

export function notFound(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  next(err);
}

export function errors(err, req, res, next) {
  res.status(err.status || 400).json({
    err: err.message || "Something went wrong",
  });
}
