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

const getAllUser = async (
  id: any,
  page: any,
  pageSize: any,
  search: any,
  status: any
): Promise<object> => {
  const filters: any = {};

  if (id) {
    filters._id = { $ne: id };
  }
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (status !== "all") {
    filters.status = status;
  }
  console.log(filters);

  const users = await User.find(filters)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const total = await User.countDocuments(filters);

  return { users, total: total };
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
