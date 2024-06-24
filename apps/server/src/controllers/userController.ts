import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import {
  createUser,
  getUserByEmail,
  generateToken,
  getAllUser,
} from "../services/userService";
import User from "../models/userModel";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await createUser(username, email, password);
    res.status(201).json({ user, token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ user, token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getUsers = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const users = await getAllUser(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deleteUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const deleteSelectedUsers = async (req: Request, res: Response) => {
  const { selectedRows } = req.body;
  try {
    const objectIds = selectedRows.map((id:string)=> {
      if(mongoose.isValidObjectId(id)){
        return new mongoose.Types.ObjectId(id)
      }
    });


    const deletedUsers = await User.deleteMany({ _id: { $in: objectIds } });
    if (!deletedUsers) res.status(404).json({ message: "Users not found" });
    res
      .status(200)
      .json({ message: "Users deleted successfully", user: deletedUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  deleteSelectedUsers,
};
