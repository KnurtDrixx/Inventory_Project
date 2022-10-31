import * as express from "express";
import userQuery from "../../database/queries/UserQueries";
import passwordUtils from "../../utilities/passwords";
import tokenUtils from "../../utilities/token";

const loginRouter = express.Router();

//current path is /login

loginRouter.post("/", async (req, res) => {
  const emailLogin = req.body.email;
  const passLogin = req.body.password;

  if (!emailLogin || !passLogin) {
    return res.status(400).json({ msg: "Please enter a valid email and password" });
  }
  // at this point email and password exist

  try {
    const users = await userQuery.getOneUser(emailLogin);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ msg: "Please enter a valid email and password." });
    }
    //at this point user exists

    const passwordCheck = passwordUtils.comparePassword(passLogin, user.password);

    if (!passwordCheck) {
      return res.status(401).json({ msg: "Please enter a valid email and password." });
    }

    //at this point user and password used to login match what is on the database

    if (!user.id) {
      return res.status(400).json({ msg: "the user was not found" });
    }

    const token = tokenUtils.signToken({ id: user.id, email: emailLogin });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "A login error has occured" });
  }
});

export default loginRouter;
