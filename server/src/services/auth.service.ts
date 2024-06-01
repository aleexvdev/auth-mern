import config from "../config/config";
import { IUser, User } from "../models/user.model";
import { SignInData, SignUpData, bodyMailOTP, tokenData, tokenDataVerify } from "../types/auth";
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
            <h1 style="color: #4C51BF; text-align: center;">Recuperación de Contraseña</h1>
            <p style="font-size: 16px; color: #333;">¡Hola!</p>
            <p style="font-size: 16px; color: #333;">Hemos recibido una solicitud para restablecer tu contraseña.</p>
            <p style="font-size: 16px; color: #333;">Tu código OTP es:</p>
            <h2 style="color: #4C51BF; font-size: 32px; font-weight: bold; text-align: center;">${codeOTP}</h2>
            <p style="font-size: 16px; color: #333;">Si no solicitaste este código, por favor ignora este correo.</p>
            <p style="font-size: 16px; color: #333;">Gracias,</p>
            <p style="font-size: 16px; color: #333;">El equipo de Soporte</p>
        </div>
      `,
      text: codeOTP
    }

    return transporter.sendMail(mailOptions);

  }

}