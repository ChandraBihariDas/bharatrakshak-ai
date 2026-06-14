import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
export const citizenLogin = async (
  req: Request,
  res: Response
) => {
  try {
    const { mobileNumber } = req.body;

    let user = await User.findOne({
      mobileNumber,
      role: "citizen",
    });

    if (!user) {
      user = await User.create({
        role: "citizen",
        mobileNumber,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      role: "citizen",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Citizen login failed",
    });
  }
};
export const responderLogin = async (
  req: Request,
  res: Response
) => {
  try {
    const { employeeId, password } = req.body;

    const user = await User.findOne({
      employeeId,
      role: "responder",
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Employee ID",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const authorityLogin = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      officerId,
      password,
      securityPin,
    } = req.body;

    const user = await User.findOne({
      officerId,
      role: "authority",
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Officer ID",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    if (user.securityPin !== securityPin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Security PIN",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authority login failed",
    });
  }
};
export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      role,
      name,
      mobileNumber,
      employeeId,
      officerId,
      password,
      teamCode,
      securityPin,
    } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const user = await User.create({
      role,
      name,
      mobileNumber,
      employeeId,
      officerId,
      password: hashedPassword,
      teamCode,
      securityPin,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};