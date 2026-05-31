import { Router } from "express";
import { UserRole } from "@prisma/client";
import {
  deleteUser,
  getCurrentUser,
  getUsers,
  updateUserRole,
} from "../controllers/userController";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

router.get("/", getUsers);
router.get("/me", requireAuth, getCurrentUser);
router.delete("/:userId", deleteUser);
router.patch(
  "/:userId/role",
  requireAuth,
  requireRole([UserRole.ADMIN]),
  updateUserRole
);

export default router;
