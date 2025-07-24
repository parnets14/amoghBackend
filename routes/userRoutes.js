
import express from "express"
import {
  getMe,
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserPhoto,
} from "../controllers/userController.js"
import { protect, authorize } from "../middleware/authMiddleware.js"
import upload from "../middleware/UserImage.js"

const router = express.Router()

// Public routes
router.post("/register", register)
router.post("/login", login)

// Protected routes (require authentication)
router.use(protect)
router.get("/me", getMe)

// Use multer middleware for profile update (handles both file and text fields)
router.put("/update-profile", upload.single("profileImage"), updateUser)
router.put("/upload-photo", upload.single("profileImage"), uploadUserPhoto)

// Admin-only routes
router.use(authorize("admin"))
router.get("/users", getUsers) // Changed from "/" to "/users" for clarity
router.get("/users/:id", getUserById) // Changed from "/:id" to "/users/:id"
router.delete("/users/:id", deleteUser) // Changed from "/:id" to "/users/:id"

export default router
