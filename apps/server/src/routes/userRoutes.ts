import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  deleteSelectedUsers,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/:email", authMiddleware, getUser);
router.get("/", authMiddleware, getUsers);
router.delete("/:id", authMiddleware, deleteUser);
router.delete("/", authMiddleware, deleteSelectedUsers);

export default router;
