const express = require("express");
//import express from 'express'
require("dotenv").config();
const path = require("path"); //thư viện gì gì đó của nodejs mà nó cho phép mình trỏ đến thư mục gần nhất hay sao ý phút thứ 12:43 https://www.youtube.com/watch?v=O8GLK0AJo90&list=PLncHg6Kn2JT734qFpgJeSfFR0mMOklC_3&index=20
const app = express();
const port = 3003;
const hostname = process.env.HOST_NAME;
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routers/web.js");
const connection = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoute = require("../src/routers/api.js");
const apiFront = require("../src/routers/apiFront.js");
//config template engine

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", apiFront);
// app.post('/api/v1/product', (req, res) => {
//     const dataFromFrontend = req.body.data;
//     console.log('Data from frontend:', dataFromFrontend);
//     res.json({ message: 'Data received successfully' });
// });

app.use("/api/v1/", apiRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

app.use(webRouter);

//express default
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
