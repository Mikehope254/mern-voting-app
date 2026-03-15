// Re-export all auth functions
export { getUsers, login, register } from "./auth.js";

// Re-export all poll functions
export {
  showPolls,
  createPoll,
  usersPolls,
  getPoll,
  vote,
  deletePoll,
} from "./poll.js";

export function error(err, req, res, next) {
  return res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || "Something went wrong.",
    },
  });
}
