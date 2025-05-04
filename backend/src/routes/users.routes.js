import { Router } from "express";
import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/activity").post(addToHistory).get(getUserHistory)

export default router;