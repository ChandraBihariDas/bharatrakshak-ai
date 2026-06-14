import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["citizen", "responder", "authority"],
      required: true,
    },

    name: {
      type: String,
    },

    mobileNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },

    officerId: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
    },

    teamCode: {
      type: String,
    },

    securityPin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);