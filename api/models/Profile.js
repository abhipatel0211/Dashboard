const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: String,
    phone: String,
    about: String,
    skills: String,
    Certificate: String,
    Certificate_by: String,
    Exp1_time_period: String,
    Exp1_type: String,
    Exp1_company: String,
    Exp1_role: String,
    Exp2_time_period: String,
    Exp2_type: String,
    Exp2_company: String,
    Exp2_role: String,
    Education: String,
    Education_year: String,
    Education_stream: String,
    Education_details: String,
  },
  { timestamps: true }
);

const Profilemodal = mongoose.model("profile-details", ProfileSchema);

module.exports = Profilemodal;
