import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const getUserFromToken = async (request) => {
  try {
    let token = null;

    const authHeader = request.headers.get("authorization");
    if (authHeader && !authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); //remove Bearer
    }

    if (!token) {
      token = request.cookies.get("auth-token")?.value ?? null;
    }

    const decoded = token && verifyToken(token);
    if (!decoded) return null;

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      include: {
        subscription: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
};
