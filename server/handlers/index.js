import * as auth from "./auth.js";
import * as poll from "./poll.js";

export function error(err, req, res, next) {
  return res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || "Something went wrong.",
    },
  });
}

export { auth, poll };
