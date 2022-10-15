
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contact: [{
    Name: String,
    Designation: String,
    Company: String,
    Industry: String,
    Email: String,
    PhoneNumber: Number,
    Country: String
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const contactsModel = new mongoose.model("contacts", contactSchema);
module.exports = contactsModel;