const express = require("express");
const router = express.Router();
const transacoesController = require("../controllers/transacoesController");

router.post("/transacoes", transacoesController.criar);
router.get("/transacoes", transacoesController.listar);

module.exports = router;