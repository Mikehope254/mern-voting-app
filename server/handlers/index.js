import * as authHandlers from "./auth.js";
import * as pollHandlers from "./poll.js";

// export { authHandlers, pollHandlers };
export * as authHandlers from "./auth.js";
export * as pollHandlers from "./poll.js";

//Error handler for matching route not found
export function notFound(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  next(err);
}

export function errors(err, req, res, next) {
  res.status(err.status || 400).json({
    message: err.message || "Something went wrong",
  });
}
