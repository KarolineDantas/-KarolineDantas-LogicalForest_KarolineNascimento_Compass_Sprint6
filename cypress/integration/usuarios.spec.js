/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

it('Cadastro de usuário com sucesso', () => {
    Factory.gerarUsuario
    Serverest.cadastrarUsuarioComSucesso().then( resposta => {
        cy.contractValidation(resposta, 'post-usuarios', 201)
        ValidaServerest.validarCadastroDeProdutoComSucesso(resposta)
    })
})

it('Tentativa de cadastro com email já utilizado', () => {
    Serverest.cadastrarUsuarioSemSucesso().then( resposta => {
        cy.contractValidation(resposta, 'post-usuarios', 400)
        ValidaServerest.validarCadastroUsuarioSemSucesso(resposta)
    })
})

it('Tentativa de cadastro com email inválido', () => {
    Serverest.cadastroUsuarioEmailInvalido().then( resposta => {
        cy.contractValidation(resposta, 'post-usuarios', 400)
        ValidaServerest.validarCadastroUsuarioEmailInvalido(resposta)
    })
})

it('Tentativa de cadastro com senha inválida', () => {
    Serverest.cadastroUsuarioSenhaInvalida().then( resposta => {
        cy.contractValidation(resposta, 'post-usuarios', 400)
        ValidaServerest.validarCadastroUsuarioSenhaInvalida(resposta)
    })
})

it('Tentativa de cadastro com nome inválido', () => {
    Serverest.cadastroUsuarioNomeInvalido().then( resposta => {
        cy.contractValidation(resposta, 'post-usuarios', 400)
        ValidaServerest.validarCadastroUsuarioNomeInvalido(resposta)
    })
})
