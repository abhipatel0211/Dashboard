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
// app.use(cors({ withcredentials: true }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Origin', '*');
//     Add other necessary headers as needed

//     next();
//   });

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your frontend application
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
  // console.log("hello "+req.cookies.token);
  return new Promise((resolve, reject) => {
    // console.log(req.cookies);
    const token = req.cookies?.token; //here i dont get the token why
    // console.log(token);
    // console.log("hello from get user data");
    // console.log(jwtSecret);
    // console.log(Userdata);
    if (token) {
      // console.log("test")
      jwt.verify(token, jwtSecret, {}, (err, Userdata) => {
        if (err) {
          throw err;
        }
        resolve(Userdata);
      });
      // jwt.verify(token, jwtSecret, {},(err, Userdata) => {
      //     // console.log(err);
      //     // console.log("profile");
      //     // console.log(Userdata);
      //     if (err)
      //     {
      //         throw err;
      //     }
      //     // console.log("now responding");
      //     resolve(Userdata);
      // });
    } else {
      console.log("no token in getuserdata");
      reject("no token");
    }
  });
}

// app.get("/people", async (req, res) => {
//   const users = await User.find({}, { _id: 1, email: 1 });
//   res.json(users);
// });

app.get("/profile", (req, res) => {
  // console.log(req.cookies.token);
  const token = req.cookies?.token;
  // console.log("inside profile");
  // console.log(token);
  // console.log(jwtSecret);
  // console.log(Userdata);
  if (token) {
    // console.log("test");
    jwt.verify(token, jwtSecret, {}, (err, Userdata) => {
      //this verify part is the middleware
      // console.log(err);
      // console.log("profile");
      // console.log(Userdata);
      if (err) {
        throw err;
      }
      // console.log("now responding");
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

// const db = "mongodb://127.0.0.1:27017/mern-chat";
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

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const app = express();
// const User = require("./models/Users");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// const bcrypt = require("bcryptjs");
// dotenv.config();
// const cors = require("cors");
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("connected mongoose");
//   })
//   .catch((err) => {
//     console.log("Error Generated" + err);
//   });

// const jwtSecret = process.env.JWT_SECRET;
// const bcryptSalt = bcrypt.genSaltSync(10);

// function getUserDataFromRequest(req) {
//   // console.log("hello "+req.cookies.token);
//   return new Promise((resolve, reject) => {
//     // console.log(req.cookies);
//     const token = req.cookies?.token; //here i dont get the token why
//     // console.log(token);
//     // console.log("hello from get user data");
//     // console.log(jwtSecret);
//     // console.log(Userdata);
//     if (token) {
//       // console.log("test")
//       jwt.verify(token, jwtSecret, {}, (err, Userdata) => {
//         if (err) {
//           throw err;
//         }
//         resolve(Userdata);
//       });
//       // jwt.verify(token, jwtSecret, {},(err, Userdata) => {
//       //     // console.log(err);
//       //     // console.log("profile");
//       //     // console.log(Userdata);
//       //     if (err)
//       //     {
//       //         throw err;
//       //     }
//       //     // console.log("now responding");
//       //     resolve(Userdata);
//       // });
//     } else {
//       console.log("no token in getuserdata");
//       reject("no token");
//     }
//   });
// }

// app.post("/login", (req, res) => {
//   // res.json("login");
//   console.log("inside login");
//   const { email, password } = req.body;
//   console.log(req.body);
//   try {
//     console.log("inside try");
//     const foundemail = User.findOne({ email });
//     console.log("checked user");
//     if (foundemail) {
//       console.log("user found");
//       console.log(email);
//       const passOk = bcrypt.compareSync(password, foundemail.password);
//       // console.log(passOk);
//       if (passOk) {
//         console.log(password);
//         jwt.sign(
//           { userId: foundemail._id, email },
//           jwtSecret,
//           {},
//           (err, token) => {
//             //takes two things error and tocken but the token
//             if (err) {
//               throw err;
//             }
//             // console.log(token);
//             res
//               .cookie("token", token, {
//                 domain: "localhost",
//                 path: "/",
//                 secure: true,
//                 httpOnly: true,
//                 expires: new Date(Date.now() + 50000),
//               })
//               .status(201)
//               .json({
//                 id: foundemail._id,
//                 token,
//                 // email
//               });
//           }
//         );
//       } else {
//         console.log("password wrong");
//       }
//     } else {
//       console.log("email not found");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
// app.post("/register", async (req, res) => {
//   res.json("inside reg");
//   console.log(req.body);
//   const { email, password } = req.body;
//   // console.log(email);
//   try {
//     const hashpassword = bcrypt.hashSync(password, bcryptSalt);
//     const createdUser = await User.create({
//       email: email,
//       password: hashpassword,
//     });
//     jwt.sign(
//       { userId: createdUser._id, email },
//       jwtSecret,
//       {},
//       (err, token) => {
//         if (err) {
//           throw err;
//         }
//         // console.log(token);
//         res
//           .cookie("token", token, {
//             domain: "localhost",
//             // path: '/',
//             secure: true,
//             httpOnly: true,
//             expires: new Date(Date.now() + 5000),
//           })
//           .status(201)
//           .json({
//             id: createdUser._id,
//             token,
//             // email
//           });
//       }
//     );
//   } catch (err) {
//     if (err) throw err;
//     res.status(500).json("error");
//   }
// });

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
