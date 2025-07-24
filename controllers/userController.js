
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please include all fields",
      })
    }

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    })

    if (user) {
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get current user
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Update user profile
// @route   PUT /api/users/update-profile
// @access  Private
export const updateUser = async (req, res) => {
  try {
    console.log("Request body:", req.body)
    console.log("Request file:", req.file)

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Extract data from req.body (multipart form data)
    const { name, email, password } = req.body

    console.log("Extracted data:", { name, email, password })

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      })
    }

    // Check if email is already taken by another user
    if (email !== user.email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        })
      }
    }

    // Update fields
    user.name = name.trim()
    user.email = email.trim().toLowerCase()

    // Only update password if provided
    if (password && password.trim()) {
      user.password = password
    }

    // Handle profile image upload
    if (req.file) {
      // Delete old profile image if it exists and is not default
      if (user.profileImage && user.profileImage !== "default.jpg") {
        const oldImagePath = path.join(__dirname, "../uploads/profileImages", user.profileImage)
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath)
          } catch (err) {
            console.log("Error deleting old image:", err)
          }
        }
      }
      user.profileImage = req.file.filename
    }

    const updatedUser = await user.save()

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        createdAt: updatedUser.createdAt,
      },
    })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    })
  }
}

// @desc    Upload user photo
// @route   PUT /api/users/upload-photo
// @access  Private
export const uploadUserPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      })
    }

    // Delete old photo if exists
    if (user.profileImage && user.profileImage !== "default.jpg") {
      const oldPhotoPath = path.join(__dirname, "../uploads/profileImages", user.profileImage)
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath)
      }
    }

    user.profileImage = req.file.filename
    await user.save()

    res.status(200).json({
      success: true,
      data: user.profileImage,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    console.log("=== GET USERS REQUEST ===")
    console.log("Request user:", req.user?.email, "Role:", req.user?.role)
    console.log("Getting all users - Admin request")

    const users = await User.find().select("-password").sort({ createdAt: -1 })
    console.log(`Found ${users.length} users in database`)

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// @desc    Get single user by ID
// @route   GET /api/auth/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error("Get user by ID error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Prevent deleting admin accounts
    if (user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete admin accounts",
      })
    }

    // Delete profile image if exists
    if (user.profileImage && user.profileImage !== "default.jpg") {
      const imagePath = path.join(__dirname, "../uploads/profileImages", user.profileImage)
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath)
        } catch (err) {
          console.log("Error deleting user image:", err)
        }
      }
    }

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {},
    })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}
