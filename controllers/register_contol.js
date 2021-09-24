const Jio = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = "bhomik";

async function register(req, res, next) {
  const userData = Jio.object({
    name: Jio.string().required(),
    password: Jio.string().required(),
    email: Jio.string().required(),
    username: Jio.string().required(),
  });
  try {
    const { error } = userData.validate(req.body);
    if (error) {
      return res.status(400).json({ err: error });
    }

    const result = await User.exists({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (result) {
      return res.status(401).json({ errors: "invalid entry1" });
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    let myuserdata = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: secpass,
      image: req.file.filename,
    };
    const myUser = await User.create(myuserdata);

    const tokenData = {
      user: {
        id: myUser.id,
      },
    };
    const jwtData = jwt.sign(tokenData, JWT_TOKEN);
    res.json({ token: jwtData, username: myUser.username });
    next();
  } catch (error) {
    console.log(error);
  }
}
module.exports = register;
