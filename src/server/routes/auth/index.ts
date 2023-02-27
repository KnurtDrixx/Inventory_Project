import * as express from "express";
import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";

const authRouter = express.Router();

authRouter.use("/login", loginRouter);
//authRouter.use("/register", registerRouter);
//registration is disabled
authRouter.use("/verify", verifyRouter);

export default authRouter;
