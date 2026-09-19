const transacoesService = require("../services/transacoesService");

const transacoesController = {
  async criar(req, res) {
    try {
      if (Object.keys(req.body).length === 0) {
        const erro = new Error("Requisição vazia");
        throw erro;
      }

      const { operacao, valor, categoria, descricao, data } = req.body;

      const dadoTransacao = {
        operacao,
        valor,
        categoria,
        descricao,
        data,
      };

      const novaTransacao = await transacoesService.criar(dadoTransacao);

      return res.status(201).json(novaTransacao);
    } catch (erro) {
      res.status(400).json({ mensagem: erro.message });
    }
  },
};

module.exports = transacoesController;
