import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
  },
  { collection: "login" }
);

export default mongoose.model("Login", LoginSchema);
