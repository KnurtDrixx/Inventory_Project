import * as express from "express";
import isValidToken from "../../utilities/tokenCheck";

const verifyRouter = express.Router();

//current path is /verify

verifyRouter.get("/", isValidToken, (req, res) => {
  res.json({ msg: ":)" });
});

export default verifyRouter;
