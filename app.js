const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();

// Auth Route
const googleAuthRouter = require('./routers/googleAuthRouter');
const localAuthRouter = require('./routers/localAuthRouter');

// Station Route
const radioStationRouter = require('./routers/radioStationRouter');

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }));

// Auth Route
app.use("/auth", googleAuthRouter)
app.use("/auth", localAuthRouter)

// station router
app.use("/radio",radioStationRouter)

// root api
app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use((err, req, res, next)=>{
    return res.status(500).send(err.message)
})

module.exports = app;