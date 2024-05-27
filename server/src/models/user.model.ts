import { Document, Schema, model } from "mongoose";
import { IRoleDocument } from "./role.model";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: IRoleDocument['_id'];
  googleId?: string;
  recoveryCode?: string;
  recoveryCodeExpires?: Date;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    }
  ],
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  recoveryCode: { type: String, default: null },
  recoveryCodeExpires: { type: Date, default: null },
},
{
  timestamps: true,
  versionKey: false
});

export const User = model<IUser>('User', userSchema);