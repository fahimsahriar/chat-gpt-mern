const { User, validate, validatelogin, validateforreset } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const SENDMAIL = require("../utils/emailSending");
const HTML_TEMPLATE = require("../utils/emailTemplate");

const register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const registeredUser = await new User({ ...req.body, password: hashPassword }).save();
    const token = registeredUser.generateAuthToken();
    res.status(201).send({ data: token, message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { error } = validatelogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const reset = async (req, res) => {
  try {
    const { error } = validateforreset(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const userExitst = await User.find({ email: req.body.email }).exec();
    if (userExitst.length === 0) {
      return res.status(401).send({ email: "User does not exist" });
    }
    const message = "Hi there, you were emailed me through nodemailer";
    const options = {
      from: "fahimsahriar082@gmail.com", // sender address
      to: req.body.email, // receiver email
      subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };
    // send mail with defined transport object and mail options
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
    return res.status(200).send({ email: "Reset happens" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};


module.exports = { login, reset, register };
