import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";

/**
 * REGISTER USER / VENDOR
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role, shopName, phone, address } = req.body;

    // check if user already exists
    const existingUser =
      role === "vendor"
        ? await Vendor.findOne({ email })
        : await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let createdUser;

    if (role === "vendor") {
      createdUser = await Vendor.create({
        name,
        email,
        password: hashedPassword,
        shopName,
        phone,
      });
    } else {
      createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        address,
      });
    }

    res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * LOGIN USER / VENDOR / ADMIN
 */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let account;

    if (role === "vendor") {
      account = await Vendor.findOne({ email });
      if (!account || account.status !== "approved") {
        return res.status(401).json({ message: "Vendor not approved" });
      }
    } else {
      account = await User.findOne({ email, role });
    }

    if (!account) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: account._id,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
