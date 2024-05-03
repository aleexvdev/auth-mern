import { Document, Schema, model } from "mongoose";

export interface IRoleDocument extends Document {
  name: string;
  description: string;
}

export const ROLES = ["user", "moderator", "admin"];

const rolesSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, 
{
  versionKey: false
});

export const Role = model<IRoleDocument>("Role", rolesSchema);