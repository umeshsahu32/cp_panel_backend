const utilFn = require("../utilities/index");

let QueryFn = [];

QueryFn.CreateUserProfile = (modal) => {
  return [
    `CALL cp_panel.sp_create_user_profile(
      @err,
      ${utilFn.GetDbValue(modal.user_id)},
      ${utilFn.GetDbValue(modal.phone)},
      ${utilFn.GetDbValue(modal.dob)},
      ${utilFn.GetDbValue(modal.designation)},
      ${utilFn.GetDbValue(modal.description)},
      ${utilFn.GetDbValue(modal.image)},
      ${utilFn.GetDbValue(modal.address)},
      @aid);`,
    `SELECT @err as err, @aid as aid;`,
  ];
};

QueryFn.GetUserProfile = (modal) => {
  return [
    `CALL cp_panel.sp_get_user_profile(
      @err,
      ${utilFn.GetDbValue(modal.user_id)}
      );`,
    "SELECT @err as err;",
  ];
};

module.exports = QueryFn;
