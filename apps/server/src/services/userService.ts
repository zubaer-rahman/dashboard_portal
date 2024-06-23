import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/userModel";

const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

const getAllUser = async (id: any): Promise<IUser[]> => {
  return User.find({ _id: { $ne: id } });
};

const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );
};

export { createUser, getUserByEmail, generateToken, getAllUser };
