import { Router } from "express";
import AuthRoutes from "./auth.route";
import UserRoutes from "./user.route";

const routes = Router();

routes.use("/auth", AuthRoutes);
routes.use("/user", UserRoutes);

export default routes;