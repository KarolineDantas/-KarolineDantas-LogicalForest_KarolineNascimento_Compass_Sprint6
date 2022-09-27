/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'


describe('Testes para a rota usuários', () => {

    it('Tentativa de cadastro com email já utilizado', () => {
        Serverest.cadastrarUsuarioSemSucesso().then(resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 400)
            ValidaServerest.validarCadastroUsuarioSemSucesso(resposta)
        })
    })

    it('Tentativa de cadastro com email inválido', () => {
        Serverest.cadastroUsuarioEmailInvalido().then(resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 400)
            ValidaServerest.validarCadastroUsuarioEmailInvalido(resposta)
        })
    })

    it('Tentativa de cadastro com senha de 1 caractere', () => {
        Serverest.cadastroUsuarioSenhaInvalida().then(resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 400)
            ValidaServerest.validarCadastroUsuarioSenhaInvalida(resposta)
        })
    })

    it('Tentativa de cadastro sem nome', () => {
        Serverest.cadastroUsuarioNomeInvalido().then(resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 400)
            ValidaServerest.validarCadastroUsuarioNomeInvalido(resposta)
        })
    })

    it('Tentativa de cadastro com administrador incorreto', () => {
        Serverest.cadastroUsuarioAdmInvalido().then(resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 400)
            ValidaServerest.validarCadastroAdmInvalido(resposta)
        })
    })

    it('Deve buscar todos os usuários cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then(resposta => {
            cy.contractValidation(resposta, 'get-usuarios', 200)
            ValidaServerest.validarBuscaDeUsuarios(resposta)
        })
    })
    
    it('Cadastro de usuário com sucesso', () => {
        Factory.gerarUsuario
        Serverest.cadastrarUsuarioComSucesso().then(resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 201)
            ValidaServerest.validarCadastroUsuarioSucesso(resposta)
        })
    })

    it('Deve buscar um usuário pelo _id sem sucessso', () => {
        Serverest.buscarUsuarioPorIdSemSucesso().then(resposta => {
            cy.contractValidation(resposta, 'get-usuarios-id', 400)
            ValidaServerest.validarBuscaDeUsuarioPeloIdSemSucesso(resposta)
        })
    })

    it('Deve buscar um usuário pelo _id com sucessso', () => {
        Serverest.buscarUsuarioPorId().then( resposta => {
            cy.contractValidation(resposta, 'get-usuarios-id', 200) 
            ValidaServerest.validarBuscaDeUsuarioPorIdSucesso(resposta)
        })
    })
})