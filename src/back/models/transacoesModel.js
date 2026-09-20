const e = require("express");
const db = require("../config/database");
const { excluir } = require("../controllers/transacoesController");

const transacoesModel = {
  async criar(dados) {
    const { operacao, valor, categoria, descricao, data } = dados;
    const [resultado] = await db.query(
      "INSERT INTO transacoes(operacao, valor, categoria, descricao, data)VALUES(?, ?, ?, ?, ?)",
      [operacao, valor, categoria, descricao, data],
    );
    return {
      id: resultado.insertId,
      operacao,
      valor,
      categoria,
      descricao,
      data,
    };
  },

  async listar(transacaoFiltrada) {
    const campoParciais = ["descricao"];

    const camposExatos = ["operacao", "valor", "categoria", "data"];

    const condicoes = [];
    const valores = [];

    let sql =
      "SELECT operacao, valor, categoria, descricao, data FROM transacoes";

    for (const campo of campoParciais) {
      if (transacaoFiltrada[campo] != null) {
        condicoes.push(`${campo} LIKE ?`);
        valores.push(`%${transacaoFiltrada[campo]}%`);
      }
    }

    for (const campo of camposExatos) {
      if (transacaoFiltrada[campo] != null) {
        condicoes.push(`${campo} = ?`);
        valores.push(transacaoFiltrada[campo]);
      }
    }

    if (condicoes.length > 0) {
      sql += " WHERE " + condicoes.join(" AND ");
    }

    const [resultado] = await db.query(sql, valores);
    return resultado;
  },

  async atualizar(transacaoValidada){
    const{id, operacao, valor, categoria, descricao, data} = transacaoValidada;

    const campos = [];
    const valores = [];

    

    if(operacao != null){
      campos.push("operacao = ?");
      valores.push(operacao);
    }

    if(valor != null){
      campos.push("valor = ?");
      valores.push(valor);
    }

    if(categoria !== undefined){
      campos.push("categoria = ?");
      valores.push(categoria);
    }

    if(descricao != null){
      campos.push("descricao = ?");
      valores.push(descricao);
    }

    if(data != null){
      campos.push("data = ?");
      valores.push(data);
    }

    valores.push(id);

    if (campos.length === 0){
       throw new Error("É necessário atualizar pelo menos um campo");
      
    }

    const [resultado] = await db.query(`UPDATE transacoes SET ${campos.join(", ")} WHERE id = ?`, valores);
    return resultado;
  },

  async excluir(id_Numerico){

    const [resultado] = await db.query("DELETE FROM transacoes WHERE id = ?",id_Numerico);
    return resultado;
  }


  
};

module.exports = transacoesModel;
