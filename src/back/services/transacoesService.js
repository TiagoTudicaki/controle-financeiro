const transacoesModel = require("../models/transacoesModel");

const transacoesService = {
  async criar(dadoTransacao) {

    const{operacao, valor, categoria, descricao, data} = dadoTransacao;
    //-----Operacao----
    if (operacao !== "receita" && operacao !== "despesa") {
      throw new Error("Operação deve ser receita ou despesa");
    }

    //-----Valor-----

    if (typeof valor !== "string" || valor.trim() === "") {
      throw new Error("O campo valor deve ser texto e não pode ser vazio");
    }

    const valorNormalizado = valor.trim().replace(",", ".");

    const regexvalor = /^\d+(\.\d{1,2})?$/;

    if (!regexvalor.test(valorNormalizado)) {
      throw new Error(
        "O campo valor deve ser um número válido (ex: 150.00 ou 150,00",
      );
    }

    const valorConvertido = Number(valorNormalizado);

    if (valorConvertido <= 0) {
      throw new Error("O campo valor deve ser maior que zero");
    }
    //-----categoria-----

    if (operacao === "despesa") {
      if (
        categoria !== "necessidade" &&
        categoria !== "desejo" &&
        categoria !== "poupanca"
      ) {
        throw new Error("Categoria deve ser necessidade, desejo ou poupanca");
      }
    }

    if (operacao === "receita") {
      if (categoria !== null) {
        throw new Error("Não existe uma categoria para receita");
      }
    }

    //---descricao----

    if (typeof descricao !== "string" || descricao.trim() === "") {
      throw new Error("O campo descrição deve ser texto e não pode ser vazio");
    }

    const descricaoPadronizada = descricao.trim().toLocaleLowerCase();

    //---data----

    if (typeof data !== "string" || data.trim() === "") {
      throw new Error("O campo data deve ser texto e não pode ser vazio");
    }

    const dataTrimada = data.trim();

    const regexData = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dataTrimada.match(regexData);

    if (!match) {
      throw new Error("Data deve estar no formato AAAA-MM-DD (ex: 2026-09-17)");
    }

    const [, ano, mes, dia] = match;

    const anoNumero = Number(ano);
    const mesNumero = Number(mes);
    const diaNumero = Number(dia);

    const dataConvertida = new Date(dataTrimada);

    if (
      dataConvertida.getUTCFullYear() !== anoNumero ||
      dataConvertida.getUTCMonth() + 1 !== mesNumero ||
      dataConvertida.getUTCDate() !== diaNumero
    ) {
      throw new Error("Data inválida (dia ou mês fora do intervalo real)");
    }

    const transacaoValidada = {
      operacao,
      valor: valorConvertido,
      categoria,
      descricao: descricaoPadronizada,
      data: dataConvertida,
    };

    const dados = await transacoesModel.criar(transacaoValidada);
    return dados;
  },
};

module.exports = transacoesService;
