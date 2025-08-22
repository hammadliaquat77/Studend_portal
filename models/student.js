// const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/studentdeta")

// const studentSchema = mongoose.Schema({
//      name: String,
//      email: String,
//      class: String,
//      image: String
// })


// module.exports = mongoose.model("student", studentSchema)






const mongoose = require("mongoose");
require("dotenv").config();  // .env file read karega

// MongoDB Atlas se connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

const studentSchema = mongoose.Schema({
  name: String,
  email: String,
  class: String,
  image: String
});

module.exports = mongoose.model("student", studentSchema);
