const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes/api");
require("dotenv").config();

const app = new express();



app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    console.error("---Database connect fail: DB_URL is missing---");
    process.exit(1);
}

mongoose.connect(dbUrl).then((res) => {
    console.log("---Database connected---")
}).catch((e) => {
    console.error("---Database connect fail---", e.message);
})

app.use('/api/v1',router);


module.exports = app;
