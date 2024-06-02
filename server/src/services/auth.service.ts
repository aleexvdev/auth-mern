import config from "../config/config";
import { IUser, User } from "../models/user.model";
import { SignInData, SignUpData, bodyMailOTP, bodyMailOTPVerify, bodyPasswordReset, tokenData, tokenDataVerify } from "../types/auth";
import { comparePassword, generateToken, hashPassword, verifyToken } from "../utils";
import { RoleService } from "./role.service";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { nodeMailConfig } from "../mailer/mailer";
import { generateOTP } from "../utils/otp.utils";
import { oauth2Client } from "../config/oauth2Config";
import dotenv from 'dotenv';

dotenv.config();
export class AuthService {

  constructor(private roleService: RoleService) { }

  signUpHandler = async (userData: SignUpData) => {
    const { username, email, password, roles = [] } = userData;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error("User with the provided email or username already exists");

    const newUser = new User({ username, email, password: await hashPassword(password) });
    if (roles.length > 0) {
      const foundRoles = await this.roleService.findRolesByNames(roles);
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await this.roleService.findDefaultRole();
      newUser.roles = [defaultRole._id];
    }
    const user = await newUser.save();
    const token = await generateToken(user._id.toString(), user.email, user.roles);
    return { user: user, token: token };
  }

  signInHandler = async (userData: SignInData) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("User with the provided email does not exist");

    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) throw new Error("Password is incorrect");

    const token = await generateToken(existingUser._id.toString(), existingUser.email, existingUser.roles);
    return { user: existingUser, token: token };
  }

  refreshTokenHandler = async (tokenData: tokenData) => {
    const { refreshToken } = tokenData;
    const decodedToken = verifyToken(refreshToken, config.jwtSecret);
    if (!decodedToken) throw new Error("Invalid refresh token");

    const user = await User.findById(decodedToken.userId);
    if (!user) throw new Error("User not found");

    const accessToken = await generateToken(user._id.toString(), user.email, user.roles);
    return { user: user, token: accessToken };
  }

  verifyTokenAndGetUser = async (tokenData: tokenDataVerify) => {
    const { token } = tokenData;
    const decodedToken = verifyToken(token, config.jwtSecret);
    if (!decodedToken) throw new Error("Invalid refresh token");
    const user = await User.findById(decodedToken.userId);
    if (!user) throw new Error("User not found");
    return { token: token, user: user };
  }

  generateOTP = async (user: IUser) => {
    const codeOTP = generateOTP();
    user.recoveryCode = codeOTP;
    user.recoveryCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    return codeOTP;
  }

  sendCodeOTPMail = async (body: bodyMailOTP) => {
    const { email } = body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const codeOTP = await this.generateOTP(user);
    let transporter = nodemailer.createTransport(nodeMailConfig);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
      }
    });
    var bodyEmail = {
      body: {
        name: user.username,
        intro: `¡Hey! Hemos recibido una solicitud para restablecer tu contraseña.<br><br><h2 style="color: #4C51BF; font-size: 32px; font-weight: bold; text-align: center;">${codeOTP}</h2>`,
        outro: 'Si no has solicitado este cambio, puedes ignorar este correo con total seguridad. Tu contraseña seguirá siendo la misma.'
      }
    }
    var mailGenerate = MailGenerator.generate(bodyEmail);
    let message = {
      from: "oran55@ethereal.email",
      to: email,
      subject: "Recovery Password - Code OTP",
      html: mailGenerate
    }

    return await transporter.sendMail(message);
  }

  sendCodeOTPMailOAuth = async (body: bodyMailOTP) => {
    const { email } = body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const codeOTP = await this.generateOTP(user);
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          type: 'OAuth2',
          user: process.env.OAUTH2_CLIENTE_EMAIL,
          clientId: process.env.OAUTH2_CLIENTE_ID,
          clientSecret: process.env.OAUTH2_CLIENTE_SECRET,
          refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
          accessToken: accessToken.token || '',
      },
    });

    const mailOptions = {
      from: process.env.OAUTH2_CLIENTE_EMAIL,
      to: email,
      subject: "Recovery Password - Code OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h1 style="color: #4C51BF; text-align: center;">Recovery Password</h1>
            <p style="font-size: 16px; color: #333;">Hello!</p>
            <p style="font-size: 16px; color: #333;">We have received a request to reset your password.</p>
            <p style="font-size: 16px; color: #333;">Your OTP code is:</p>
            <h2 style="color: #4C51BF; font-size: 32px; font-weight: bold; text-align: center;">${codeOTP}</h2>
            <p style="font-size: 16px; color: #333;">If you did not request this code, please ignore this email.</p>
            <p style="font-size: 16px; color: #333;">Thank you,</p>
            <p style="font-size: 16px; color: #333;">The Support Team.</p>
        </div>
      `,
      text: codeOTP
    }
    const sendMailOTP = await transporter.sendMail(mailOptions);
    return { email: email, send: sendMailOTP };

  }

  verifyOTPOAuth = async (body: bodyMailOTPVerify) => {
    const { email, otp } = body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.recoveryCode!== otp) throw new Error("OTP is incorrect");

    const nowDate = new Date();
    const expired = user.recoveryCodeExpires ? user.recoveryCodeExpires : nowDate;
    if (nowDate > expired) throw new Error("OTP is expired");

    user.recoveryCode = null;
    user.recoveryCodeExpires = null;
    await user.save();

    return { email: email, access: true };

  }

  recoverPassword = async (body: bodyPasswordReset) => {
    const { email, password, confirmPassword } = body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    if (password!== confirmPassword) throw new Error("Passwords do not match");
    const hashedPassword = await hashPassword(password);
    user.password =  hashedPassword;
    await user.save();
    const token = await generateToken(user._id.toString(), user.email, user.roles);
    return { user: user, token: token };
  }
}