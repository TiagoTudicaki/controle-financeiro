const db = require("../config/database");

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

  async filtrar(transacaoFiltrada) {
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
};

module.exports = transacoesModel;
