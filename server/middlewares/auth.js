import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    //Verifies the JWT token using the secret key stored in process.env.SECRET
    //If valid, decoded will contain user details { id, username }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        //If the token is invalid or expired it calls next(Error("")) to stop execution
        return next(Error("Failed to authenticate token"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(Error("No token provided"));
  }
};

export default authMiddleware;
