import * as express from "express";

import IngredientsRouter from "./ingredientsRoutes";
import itemsRouter from "./itemsRoutes";

//curent path is /api

const apiRouter = express.Router();

apiRouter.use("/items", itemsRouter);
apiRouter.use("/ingredients", IngredientsRouter);

export default apiRouter;
