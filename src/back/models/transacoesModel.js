const db = require("../config/database");


const transacoesModel = {
    async criar(dados){
        const{operacao, valor, categoria, descricao,data} = dados;
        const [resultado] = await db.query("INSERT INTO transacoes(operacao, valor, categoria, descricao, data)VALUES(?, ?, ?, ?, ?)",[operacao, valor, categoria, descricao, data,]);
        return {
            id: resultado.insertId,
            operacao,
            valor,
            categoria,
            descricao,
            data,
        }
    }
}

module.exports = transacoesModel;