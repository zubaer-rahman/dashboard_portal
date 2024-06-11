import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getUsers,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:email", authMiddleware, getUser);
router.get("/", authMiddleware, getUsers);

export default router;
