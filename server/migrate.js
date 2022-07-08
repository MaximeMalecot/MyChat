require('dotenv').config();
const { connection } = require("./models/postgres");

connection
  .sync({
    force: true,
  })
  .then(() => {
    console.log("Database synced");
    connection.close();
  });
