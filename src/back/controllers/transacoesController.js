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

  async listar(req, res){
    try{
      const{operacao, valor, categoria, descricao, data} = req.query;

      const dadoTransacao = {
        operacao,
        valor,
        categoria,
        descricao,
        data,
      }

      const listarTransacao = await transacoesService.listar(dadoTransacao);
      if(listarTransacao.length === 0){
        return res.status(200).json({mensagem:"Nenhuma transação econtrada"});
      }
      return res.status(200).json(listarTransacao);
    }catch(erro){
      res.status(400).json({mensagem: erro.message});
    }
  },

  async atualizar(req, res){
    try{
      if(Object.keys(req.body).length === 0){
        const erro = new Error("Atualizar precisa de pelo menos um campo");
        throw erro;
      }

      if(Object.keys(req.params).length === 0){
        const erro = new Error("É necessário id");
        throw erro;
      }

      const{id} = req.params;
      const{operacao, valor, categoria, descricao, data} = req.body;

      const dadoTransacao = {
        id,
        operacao,
        valor,
        categoria,
        descricao,
        data,
      }

      const atualizarTransacao = await transacoesService.atualizar(dadoTransacao);
      return res.status(200).json(atualizarTransacao);
    }catch(erro){
      res.status(400).json({mensagem: erro.message});
    }
  }
};

module.exports = transacoesController;
