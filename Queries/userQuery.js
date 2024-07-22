const utilFn = require("../utilities/index");

let QueryFn = [];

QueryFn.CreateUser = (modal) => {
  return [
    `CALL cp_panel.sp_create_user(
      @err,
      1,
      ${utilFn.GetDbValue(modal.name)},
      ${utilFn.GetDbValue(modal.email_address)},
      ${utilFn.GetDbValue(modal.pwd)},
      ${utilFn.GetDbValue(modal.otp)},
      ${utilFn.GetDbValue(modal.partner_id)},
      @aid);`,
    `SELECT @err as err, @aid as aid;`,
  ];
};

QueryFn.GetUser = (modal) => {
  return [
    `CALL cp_panel.sp_get_user(
    @err,
    ${utilFn.GetDbValue(modal.user_id)},
    ${utilFn.GetDbValue(modal.email_address)}
    );`,
    "SELECT @err as err;",
  ];
};

QueryFn.EditUser = (modal) => {
  return [
    `CALL cp_panel.sp_edit_user(
    @err, 
    ${utilFn.GetDbValue(modal.user_id)}, 
    ${utilFn.GetDbValue(modal.user_id)}, 
    ${utilFn.GetDbValue(modal.name)}, 
    ${utilFn.GetDbValue(modal.email_address)}, 
    ${utilFn.GetDbValue(modal.password)}, 
    ${utilFn.GetDbValue(modal.otp)}, 
    ${utilFn.GetDbValue(modal.partner_id)}, 
    ${utilFn.GetDbValue(modal.status)})`,
    `SELECT @err as err;`,
  ];
};

module.exports = QueryFn;
