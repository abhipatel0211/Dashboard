const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/Users");
const Profile = require("./models/Profile");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

app.options("*", cors()); // Handle preflight requests

app.get("/", async (req, res) => {
  res.json("test ok");
});

function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token;
    if (token) {
      // console.log("test")
      jwt.verify(token, jwtSecret, {}, (err, Userdata) => {
        if (err) {
          throw err;
        }
        resolve(Userdata);
      });
    } else {
      console.log("no token in getuserdata");
      reject("no token");
    }
  });
}

app.post("/profile", async (req, res) => {
  const token = req.cookies?.token;
  const {
    email,
    name,
    phone,
    about,
    skills,
    Certificate,
    Certificate_by,
    Exp1_time_period,
    Exp1_type,
    Exp1_company,
    Exp1_role,
    Exp2_time_period,
    Exp2_type,
    Exp2_company,
    Exp2_role,
    Education,
    Education_year,
    Education_stream,
    Education_details,
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, Userdata) => {
      if (err) {
        throw err;
      }
      const found_data = await Profile.findOne({ email: Userdata.email });
      if (Userdata.email != email) {
        res.json("email not matched");
      }
      if (found_data) {
        res.json("User already exists!!");
      } else {
        const newProfile = new Profile({
          email,
          name,
          phone,
          about,
          skills,
          Certificate,
          Certificate_by,
          Exp1_time_period,
          Exp1_type,
          Exp1_company,
          Exp1_role,
          Exp2_time_period,
          Exp2_type,
          Exp2_company,
          Exp2_role,
          Education,
          Education_year,
          Education_stream,
          Education_details,
        });
        const savedProfile = await newProfile.save();
        res.status(201).json("user created successfully");
      }
    });
  } else {
    res.status(401).json("no token");
  }
});

app.get("/profile", async (req, res) => {
  const token = req.cookies?.token;
  console.log("inside profile");
  if (token) {
    console.log("inside profile if");
    try {
      const Userdata = jwt.verify(token, jwtSecret, {});
      const found_data = await Profile.findOne({ email: Userdata.email });

      if (found_data) {
        console.log("user found");
        console.log(found_data);
        res.json({ found_data }); // Send the found user data
      } else {
        console.log("user not found");
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      console.error("JWT verification error:", err);
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "No token provided" });
  }
});

// app.get("/profile", async (req, res) => {
//   const token = req.cookies?.token;
//   console.log("inside profile");
//   // const {id,token} = req.body;
//   if (token) {
//     console.log("inside profile if");
//     // console.log("test");
//     jwt.verify(token, jwtSecret, {}, (err, Userdata) => {
//       if (err) {
//         throw err;
//       }
//       const found_data = Profile.findOne({ email: Userdata.email });
//       if (found_data) {
//         console.log("user found");
//         console.log(found_data);
//         res.json({ found_data }); // Send the found user data
//       } else {
//         res.json({ Userdata });
//       }
//       // res.json({ found_data } || { "no data found": Userdata });
//     });
//   } else {
//     res.status(401).json("no token");
//   }
// });

app.post("/login", async (req, res) => {
  console.log("inside login");
  const { email, password } = req.body;
  try {
    const foundemail = await User.findOne({ email });
    if (foundemail) {
      // console.log(email);
      const passOk = bcrypt.compareSync(password, foundemail.password);
      // console.log(passOk);
      if (passOk) {
        // console.log(password);
        jwt.sign(
          { userId: foundemail._id, email },
          jwtSecret,
          {},
          (err, token) => {
            //takes two things error and tocken but the token
            if (err) {
              throw err;
            }
            // console.log(token);
            res
              .cookie("token", token, {
                // domain: "localhost",
                // path: "/",
                // secure: true,
                // httpOnly: true,
                expires: new Date(Date.now() + 5000000),
              })
              .status(201)
              .json({
                id: foundemail._id,
                token,
                // email
              });
          }
        );
      } else {
        // console.log("password wrong ");
        res.json("wrong_password");
      }
    } else {
      // console.log("email not found");
      res.json("no_email");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/logout", (req, res) => {
  console.log("in logout");

  res.cookie("token", "", { sameSite: "none", secure: true }).json("ok");
});
app.post("/register", async (req, res) => {
  // res.json("inside reg");
  // console.log(req.body);
  const { email, password } = req.body;
  // console.log(email);
  try {
    const foundemail = await User.findOne({ email });
    if (foundemail) {
      // console.log("already exist from register");
      res.json("email_already_exist");
    } else {
      const hashpassword = bcrypt.hashSync(password, bcryptSalt);
      const createdUser = await User.create({
        email: email,
        password: hashpassword,
      });
      jwt.sign(
        { userId: createdUser._id, email },
        jwtSecret,
        {},
        (err, token) => {
          //takes two things error and tocken but the token
          if (err) {
            throw err;
          }
          // console.log(token);
          res
            .cookie("token", token, {
              // domain: "localhost",
              // path: '/',
              // secure: true,
              // httpOnly: true,
              expires: new Date(Date.now() + 500000),
            })
            .status(201)
            .json({
              id: createdUser._id,
              token,
              // email
            });
        }
      );
    }
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

app.get("/test", (req, res) => {
  // res.send("test");
  res.json("test ok");
  // res.cookie("abhi", "hello");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
