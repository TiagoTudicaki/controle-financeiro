const transacoesService = require("../services/transacoesService");

const transacoesController = {
  async criar(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        const erro = new Error("Requisição vazia");
        throw erro;
      }

      const { operacao, valor, categoria, descricao,data } = req.body;

      const novaTransacoes = await transacoesService.criar(
        operacao,
        valor,
        categoria,
        descricao,
        data,
      );

      return res.status(201).json(novaTransacoes);
    } catch (erro) {
      res.status(400).json(erro);
    }
  },
};

module.exports = transacoesController;
