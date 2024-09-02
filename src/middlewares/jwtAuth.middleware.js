import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {

  const { jwtToken } = req.cookies; // Take the token from the cookie which was created when logging in
  let userPayload; // its the data of user which was added during login

  try {
    userPayload = jwt.verify(jwtToken, process.env.JWT_SECRET); // Verify the token
  } catch (err) { // catch any error
    return res.status(401).json({ success: false, msg: "login to continue" });
  }

  // Assign the userId obtained from userPayload to req for use where signin required
  req.userId = userPayload.userId;
  next();
};

export default jwtAuth;




