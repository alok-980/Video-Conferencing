import { Router } from "express";
import { loging, register } from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(loging)
router.route("/register").post(register)
router.route("/add_to_activity")
router.route("/get_all_activity")

export default router;