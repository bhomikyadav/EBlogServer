const Jio = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = "bhomik";
async function login(req, res, next) {
  const logindata = Jio.object({
    password: Jio.string().required(),
    username: Jio.string().required(),
  });

  const { error } = logindata.validate(req.body);
  if (error) {
    return res.send(error);
  }
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ errors: "invalid entry" });
  }
  const passcompare = await bcrypt.compare(password, user.password);
  if (!passcompare) {
    return res.status(400).json({ err: "invalid entry" });
  }
  const data = {
    user: {
      id: user.id,
    },
  };

  const jwtData = await jwt.sign(data, JWT_TOKEN);
  res.json({ token: jwtData, username: user.username });

  try {
  } catch (error) {}
}
module.exports = login;

// async loginuser(req, res, next) {
//     const productdata = Jio.object({
//       password: Jio.string().required(),
//       username: Jio.string().required(),
//     });

//     const { error } = productdata.validate(req.body);
//     if (error) {
//       return res.send(error);
//     }
//     try {
//       const { username, password } = req.body;
//       let user = await User.findOne({ username });
//       if (!user) {
//         return res.status(401).json({ errors: "invalid entry" });
//       }
//       const passcompare = await bcrypt.compare(password, user.password);
//       if (!passcompare) {
//         return res.status(400).json({ err: "invalid entry" });
//       }
//       const data = {
//         user: {
//           id: user.id,
//           role: user.role,
//         },
//       };

//       const jwtData = await jwt.sign(data, JWT_TOKEN);
//       res.json({ token: jwtData, name: user.name ,login:true});
//     } catch (error) {
//       console.log("error" + error);
//     }
//   },
