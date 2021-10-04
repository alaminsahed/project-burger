const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");


//register new user
const getNewUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("email already registered");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //password hashing
  const slat = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, slat);

  //generate jwt token
  const token = newUser.genJWT();

  try {
    const saveUser = await newUser.save();
    res.send({ token: token, user: saveUser });
  } catch (error) {
    console.log(error);
    res.status(401).send("Register failed");
  }
};

// login for user

const getUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).send("User not found");

  try {
    //password decode
    const dataPassword = await bcrypt.compare(req.body.password, user.password);
    if (!dataPassword) return res.status(401).send("Invalid password");

    //jwt token generated
    const token = user.genJWT();
    res.send({ token: token, user:user });
  } catch (error) {
    res.status(404).send("Invalid email or password");
  }
};

router.route("/").post(getNewUser);

router.route("/login").post(getUser);

module.exports = router;
