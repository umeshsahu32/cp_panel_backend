// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();
// const mongo_url = process.env.MONGO_CONNECTION;

// const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(mongo_url);
//     console.log(`Mongodb Connected: ${connect.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.bold);
//     process.exit(1); // Exit with a non-zero status code to indicate an error
//   }
// };

// module.exports = connectDB;

const mysql = require("mysql2/promise");
const { DBConfig, ERRORS } = require("./config");
const colors = require("colors");

var fn = [];

const pool = mysql.createPool({
  connectionLimit: DBConfig.connectionLimit,
  host: DBConfig.host,
  port: DBConfig.port,
  user: DBConfig.user,
  password: DBConfig.password,
  database: DBConfig.database,
});

async function GetDbPool() {
  try {
    const connection = await pool.getConnection();
    return { error: null, client: connection };
  } catch (err) {
    if (err instanceof AggregateError) {
      for (const individualError of err.errors) {
        console.log(individualError.message);
      }
    } else {
      console.log("Not connected due to error: " + err.message);
    }
    return { error: err, client: null };
  }
}

fn.Execute = async (query) => {
  const { error, client } = await GetDbPool();

  if (error) {
    return { status: ERRORS.NOT_FOUND, statusText: error.message };
  }

  if (client === null) {
    return {
      status: ERRORS.BAD_REQUEST,
      statusText: "Failed Creating Pool",
    };
  }

  try {
    const results = await client.query(query);

    const [procedureResult, errResult] = results;

    return {
      status: ERRORS.OK,
      data: procedureResult,
    };
  } catch (err) {
    let text = err.message;
    let status = ERRORS.BAD_REQUEST;
    if (err.code === "ER_DUP_ENTRY") {
      text = "Duplicate entry";
      status = ERRORS.DUPLICATE_ENTRY;
    }
    return { status: status, statusText: text };
  } finally {
    client.release();
  }
};

module.exports = fn;
