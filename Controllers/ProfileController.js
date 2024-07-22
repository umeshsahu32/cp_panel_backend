const { ERRORS } = require("../config/config");
const db = require("../config/db");
const QueryFn = require("../Queries/profileQueries");

let fn = [];

// # COUNT       --> 1
// # DESCRIPTION --> CREATE USER PROFILE
// # ROUTE       --> profile/create-user-profile
// # METHOD      --> POST
fn.CreateUserProfile = async (req, res) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let modal = JSON.parse(JSON.stringify(input));
    const [procedureQuery, errorQuery] = await QueryFn.CreateUserProfile(modal);
    const result = await db.Execute(procedureQuery, errorQuery);
    if (result.status !== ERRORS.OK) return resolve(result);
    return resolve({
      status: ERRORS.OK,
      statusText: "Profile Created Successfully",
    });
  });
};

// @ COUNT       --> 2
// @ DESCRIPTION --> GET USER PROFILE
// @ ROUTE       --> profile/get-user-profile/:id
// @ METHOD      --> GET
fn.GetUserProfile = async (req, res) => {
  return new Promise(async (resolve) => {
    const user_id = req.params.id;
    const [procedureQuery, errorQuery] = await QueryFn.GetUserProfile({
      user_id,
    });
    const result = await db.Execute(procedureQuery, errorQuery);

    if (result.status !== ERRORS.OK) return resolve(result);

    return resolve({
      status: ERRORS.OK,
      statusText: "Success",
      data: result.data[0],
    });
  });
};

module.exports = fn;
