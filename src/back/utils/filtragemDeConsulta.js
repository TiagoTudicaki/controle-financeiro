function consultaFiltrada(dados) {
  return Object.fromEntries(
    Object.entries(dados).filter(([_, valor]) => valor?.toString().trim()),
  );
}

module.exports = consultaFiltrada;