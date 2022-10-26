import express from "express";
import passwordUtils from "../../utilities/passwords";
import userQuery from "../../database/queries/UserQueries";
import tokenUtils from "../../utilities/token";

const registerRouter = express.Router();

//path is /auth/register

registerRouter.post("/", async (req, res) => {
  const email = req.body.email;
  const plainText = req.body.password;

  if (!email || !plainText) {
    return res.status(400).json({ msg: "please enter email or password" });
  }
  // at this point email and plaintext exist

  try {
    const hashedPass = passwordUtils.createPassword(plainText);
    //at this point the hashed pass word exists

    const metaData = await userQuery.createOneUser({ email, password: hashedPass });

    const token = tokenUtils.signToken({ id: metaData.insertId, email });
    res.json({ token, id: metaData.insertId });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "A Registration error occured. Please try again." });
  }
});

export default registerRouter;
