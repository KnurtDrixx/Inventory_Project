import * as express from "express";
import tokenUtils from "./token";

const isValidToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.ip == "66.25.115.253") {
    res.status(403).json({ msg: "Andrew you are not Allowed to access that part of my project" });
    return;
  }
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Wrongs Beans In'nit?" });
    return;
  }

  const [type, token] = req.headers.authorization.split(" ");

  if (type !== "Bearer" || !token) {
    res.status(401).json({ message: "Wrong Authentication Scheme Gov?" });
    return;
  }

  try {
    const tokenHolder = tokenUtils.verifyToken(token);
    req.payload = tokenHolder;
    next();
  } catch (error) {
    res.status(401).json({ message: "This Token is Garbage" });
  }
};

export default isValidToken;
