const express = require("express");
const path = require("path");
const app = express();
const transacoesRoute = require("./src/back/routes/transacoesRoute");

app.use(express.json());
app.use(express.static(path.join(__dirname, "src/front/public")));
app.use(transacoesRoute);

module.exports = app;