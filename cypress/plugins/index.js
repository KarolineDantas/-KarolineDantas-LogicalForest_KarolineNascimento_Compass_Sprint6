/// <reference types="cypress" />
// ***********************************************************

const fs = require('fs-extra');
const path = require('path');
//const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

function buscarArquivoDeConfig(arquivo){
  const caminhoDoArquivo = path.resolve('.', 'cypress', 'config',`${arquivo}.json`)
  return fs.readJson(caminhoDoArquivo)
}

module.exports = (on, config) => {
  //allureWriter(on, config);
  const arquivo = config.env.configFile || 'dev'
  return buscarArquivoDeConfig(arquivo)
}

