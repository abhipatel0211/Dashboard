const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const User = require("./models/Users");
const bcrypt = require("bcryptjs");

const cors = require("cors");
const app = express();
app.use(cors());

console.log(process.env.CLIENT_URL);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://oru-assignment.vercel.app/", // Replace with the URL of your frontend application
    credentials: true, // Set the "Access-Control-Allow-Credentials" header to "true"
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected mongoose");
  })
  .catch((err) => {
    console.log("Error Generated" + err);
  });
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

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

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    // console.log("test");
    jwt.verify(token, jwtSecret, {}, (err, Userdata) => {
      if (err) {
        throw err;
      }
      res.json(Userdata);
    });
  } else {
    res.status(401).json("no token");
  }
});

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
                path: "/",
                // secure: true,
                // httpOnly: true,
                expires: new Date(Date.now() + 50000),
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
              domain: "localhost",
              // path: '/',
              secure: true,
              httpOnly: true,
              expires: new Date(Date.now() + 5000),
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
  res.cookie("abhi", "hello");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
