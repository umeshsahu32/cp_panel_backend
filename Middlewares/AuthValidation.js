const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email_address: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    partner_id: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(404).json({ message: "Bad Request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email_address: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(404).json({ message: "Bad Request", error });
  }
  next();
};

const updatePasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email_address: Joi.string().email().required(),
    oldPassword: Joi.string().min(6).max(100).required(),
    newPassword: Joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "Bad Request", error });
  }
  next();
};

const emailValidation = (req, res, next) => {
  const schema = Joi.object({
    email_address: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "Bad Request", error });
  }
  next();
};

const otpValidation = (req, res, next) => {
  const schema = Joi.object({
    email_address: Joi.string().email().required(),
    otp: Joi.string().min(6).max(6).required(),
    newPassword: Joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
  updatePasswordValidation,
  emailValidation,
  otpValidation,
};
