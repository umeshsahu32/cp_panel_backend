const db = require("../config/db");
const { ERRORS } = require("../config/config");
const utilFn = require("./index");
const QueryFn = require("../Queries/userQuery");

let fn = [];

fn.FindUser = async (req) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let modal = JSON.parse(JSON.stringify(input));
    const [procedureQuery, errorQuery] = QueryFn.GetUser(modal);
    const result = await db.Execute(procedureQuery, errorQuery);
    if (result.status !== ERRORS.OK) {
      return resolve(result);
    }

    let data = result.data.length > 0 ? result.data[0] : [];
    return resolve({
      status: ERRORS.OK,
      data: data,
    });
  });
};

//! POST API TO CREATE NEW USER OR USER SIGN UP
fn.UserSignup = async (req) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let modal = JSON.parse(JSON.stringify(input));
    let pwd = await utilFn.CryptPassword(modal.password);
    let otp = await utilFn.GenerateUniqueOTP();
    modal.otp = otp;
    modal.pwd = pwd.data;
    const [procedureQuery, errorQuery] = QueryFn.CreateUser(modal);
    const result = await db.Execute(procedureQuery, errorQuery);
    if (result.status !== ERRORS.OK) {
      return resolve(result);
    }
    return resolve({
      status: ERRORS.OK,
      statusText: `User created successful`,
      data: result.data[0],
    });
  });
};

//! POST API TO CREATE NEW USER OR USER SIGN UP
fn.UpdateUser = async (req) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let modal = JSON.parse(JSON.stringify(input));
    const [procedureQuery, errorQuery] = QueryFn.EditUser(modal);
    const result = await db.Execute(procedureQuery, errorQuery);

    if (result.status !== ERRORS.OK) {
      return resolve(result);
    }
    return resolve({
      status: ERRORS.OK,
      statusText: `Update Successful`,
    });
  });
};

module.exports = fn;
