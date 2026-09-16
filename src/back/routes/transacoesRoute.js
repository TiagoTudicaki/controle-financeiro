const express = require("express");
const router = express.Router();
const transacoesController = require("../controllers/transacoesController");

router.post("/transacoes", transacoesController.criar);

module.exports = router;