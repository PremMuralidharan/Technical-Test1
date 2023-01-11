const { request } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const uri =
"mongodb+srv://premmurali:premmurali@cluster0.au236bt.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(cors());
app.use(express.json());

const passROuter = require('./routes/passwordpost');

app.use('/passwordcheck',passROuter);

app.get("/",(request,response)=>{
    response.send("hello world");
})

app.listen(8000, () => {
    console.log("Server started on port 8000");
});