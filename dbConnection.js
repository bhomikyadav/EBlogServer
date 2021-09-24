const mongoose = require("mongoose");
const dataUrl =
  "mongodb://localhost:27017/Eblog-DB?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const connecttodatabase = async () => {
  try {
    await mongoose.connect(
      dataUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("runing databases...");
      }
    );
  } catch (error) {
    console.log("failed to run  database....");
  }
};
module.exports = connecttodatabase;
