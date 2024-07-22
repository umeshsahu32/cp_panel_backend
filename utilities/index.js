const bcrypt = require("bcrypt");
const { ERRORS } = require("../config/config.js");

let fn = [];

fn.GetDbValue = (val) => {
  if (!val) return null;

  if (typeof val === "number") {
    return val;
  }

  let _val = val;
  if (_val?.indexOf("'") > -1) {
    _val = val.replace("'", "''");
  }

  return `'${_val}'`;
};

fn.CryptPassword = async (input) => {
  return new Promise((resolve) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return resolve({ status: ERRORS.NOT_FOUND, statusText: err });
      bcrypt.hash(input, salt, function (err, hash) {
        return resolve({ status: ERRORS.OK, data: hash });
      });
    });
  });
};

fn.ComparePassword = async (input, hashWord) => {
  return new Promise((resolve) => {
    bcrypt.compare(input, hashWord, function (err, match) {
      return resolve(match);
    });
  });
};

fn.GenerateUniqueOTP = async () => {
  return new Promise((resolve) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    resolve(otp);
  });
};

fn.IsEmptyObject = async (input) => {
  return new Promise((resolve) => {
    for (var key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        return resolve(false);
      }
    }
    return resolve(true);
  });
};

module.exports = fn;
