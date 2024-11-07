const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");
const PasswordResetToken = require("../../model/passwordResetTokenModel");
const router = express.Router();
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {log} = require("console");

router.post("/login", async (req, res) => {
    try {
        let {email, password} = req.body;
        email = email.trim().toLowerCase();
        console.log(email);

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({message: "User not found"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const jwtToken = jwt.sign(
            {
                userId: user.uid,
                email: user.email,
                role: user.role,
                name: user.name,
                department: user.department,
            },
            process.env.JWT_KEY,
            {expiresIn: "24h"}
        );

        res.json({
            jwtToken,
            userId: user.uid,
            email: user.email,
            role: user.role,
            name: user.name,
            department: user.department,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Something went wrong"});
    }
});

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post("/forgot-password", async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const token = crypto.randomBytes(32).toString("hex");

        const expirationTime = 1 * 15 * 60 * 1000;
        const expiresAt = new Date(Date.now() + expirationTime);

        const resetToken = new PasswordResetToken({
            userId: user._id,
            token,
            expiresAt,
        });
        await resetToken.save();

        const resetURL = `${process.env.RESET_PASS_BASE_URL}auth/forget-password/${token}`;
        console.log(resetURL);

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Password Reset Request",
            html: `
        <p>Hello ${user.name},</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <a href="${resetURL}">Reset Password</a>
        <p>This link will expire in 15 minutes. If you did not request this, you can safely ignore this email.</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.json({message: "Password reset link sent to email."});
    } catch (error) {
        console.error("Error sending password reset email:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.get("/reset-password/:token", async (req, res) => {
    try {
        const {token} = req.params;
        const resetToken = await PasswordResetToken.findOne({token});

        if (!resetToken) {
            return res.status(400).json({message: "Invalid or expired token"});
        }

        res
            .status(200)
            .json({message: "Token is valid", userId: resetToken.userId});
    } catch (error) {
        console.error("Error verifying reset token:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.post("/update-password", async (req, res) => {
    try {
        const {password, token} = req.body;

        const resetToken = await PasswordResetToken.findOne({token});

        if (!resetToken) {
            return res.status(400).json({message: "Invalid or expired token"});
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const logUser = await User.findOne({_id: resetToken.userId})
        console.log("User: "+logUser)

        // await User.findOneAndUpdate(
        //     { _id: resetToken.userId },
        //     { $set: { password: hashedPassword } },
        //     { new: true }
        // );

        await User.findByIdAndUpdate(
            resetToken.userId,
            {$set: {password:hashedPassword}},
            {new:true}
        );

        await PasswordResetToken.findByIdAndDelete(resetToken._id);

        res.status(200).json({message: "Password updated successfully"});
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;
