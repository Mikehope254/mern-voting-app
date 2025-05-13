import { verify } from "jsonwebtoken";

export default (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        next(Error("Failed to authenticate token"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(Error("No token provided"));
  }
};
