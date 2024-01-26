import { Router } from "express";
import verifyAuth from "../middleware/verifyAuth.middleware";
import AuthRoutes from "./auth.route";
import UserRoutes from "./user.route";
import AppointmentRoutes from "./appointment.route";
import IllnessRoutes from "./illness.route";
import SymptomRoutes from "./symptom.route";
import OccurenceRoutes from "./occurence.route";

const routes = Router();

routes.use("/auth", AuthRoutes);
routes.use("/user", verifyAuth, UserRoutes);
routes.use("/appointment", verifyAuth, AppointmentRoutes);
routes.use("/illness", verifyAuth, IllnessRoutes);
routes.use("/symptom", verifyAuth, SymptomRoutes);
routes.use("/occurence", verifyAuth, OccurenceRoutes);

export default routes;