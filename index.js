const express = require('express');
const mongoose = require('mongoose');
const ContactsRouter = require("./Routes/contacts")
// const db = "mongodb+srv://group8:group8@cluster0.cgcmvry.mongodb.net/?retryWrites=true&w=majority";

const db = "mongodb://group8:group8@ac-yka4dej-shard-00-00.cgcmvry.mongodb.net:27017,ac-yka4dej-shard-00-01.cgcmvry.mongodb.net:27017,ac-yka4dej-shard-00-02.cgcmvry.mongodb.net:27017/?ssl=true&replicaSet=atlas-q1di5q-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(db).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());

app.use("/uploads", express.static("uploads"))

app.use("/", ContactsRouter);
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})