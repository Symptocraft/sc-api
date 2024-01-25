import { Router } from "express";
import verifyAuth from "../middleware/verifyAuth.middleware";
import AuthRoutes from "./auth.route";
import UserRoutes from "./user.route";

const routes = Router();

routes.use("/auth", AuthRoutes);
routes.use("/user", verifyAuth, UserRoutes);

export default routes;