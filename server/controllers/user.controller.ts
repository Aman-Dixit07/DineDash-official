import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mailtrap/email";


export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
      const { fullname, email, password, contact } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exist with this email",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = generateVerificationCode();
  
      user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        contact: Number(contact),
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
  
      generateToken(res, user);

      //send verification email
      sendVerificationEmail(email, verificationToken);
  
      const userWithoutPassword = await User.findOne({ email }).select(
        "-password"
      );
  
      return res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.log("Error in signup controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect email or password",
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect email or password",
        });
      }
  
      generateToken(res, user);
  
      user.lastLogin = new Date();
      await user.save();
  
      const userWithoutPassword = await User.findOne({ email }).select(
        "-password"
      );
  
      return res.status(200).json({
        success: true,
        message: `Welcome back ${user.fullname}`,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.log("error in login controller", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};


export const verifyEmail = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { verificationCode } = req.body;
  
      const user = await User.findOne({
        verificationToken: verificationCode,
        verificationTokenExpiresAt: { $gt: Date.now() },
      }).select("-password");
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired verification token",
        });
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();
  
      //send welcome email
      sendWelcomeEmail(user.email, user.fullname);
  
      return res.status(200).json({
        success: true,
        message: "Email verified Successfully",
        user,
      });
    } catch (error) {
      console.log("error in verify email  controller", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};
  

export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
      return res.clearCookie("token").status(200).json({
        success: true,
        message: "Logged Out Successfully",
      });
    } catch (error) {
      console.log("error in logout controller", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};
  

export const forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exist",
        });
      }
  
      const resetToken = crypto.randomBytes(40).toString("hex");
      const resestTokenExpiredAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpiresAt = resestTokenExpiredAt;
      await user.save();
  
      //send password reset email
      sendPasswordResetEmail(
         email,
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
      );
  
      return res.status(200).json({
        success: true,
        message: "password reset link sent to your email",
      });
    } catch (error) {
      console.log("error in forgot password controller", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};
  

export const resetPassword = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
  
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token",
        });
      }
  
      //update password
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiresAt = undefined;
      await user.save();
  
      //send success reset email
       sendResetSuccessEmail(user.email);
  
      return res.status(200).json({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log("error in reset password controller", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};

  
export const checkAuth = async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.id;
      const user = await User.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log("error in check auth controller", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};

  
export const updateProfile = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const userId = req.id;
  
      const { fullname, email, address, city, country, profilePicture } =
        req.body;
  
      const updatedData = {
        fullname,
        email,
        address,
        city,
        country,
        profilePicture,
      };
  
      //upload image on cloudinary
  
      if (profilePicture && profilePicture.startsWith("data:image")) {
        const cloudResponse = await cloudinary.uploader.upload(profilePicture);
        updatedData.profilePicture = cloudResponse.secure_url;
      }
  
      const user = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      }).select("-password");
  
      return res.status(200).json({
        success: true,
        user,
        message: "Profile Updated Successfully",
      });
    } catch (error) {
      console.log("error in updateprofile controller", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
};