/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

describe('Testes para a rota carrinhos', () => {

    it('Cadastro de usuário com sucesso', () => {
        Factory.gerarUsuario
        Serverest.cadastrarUsuarioComSucesso().then(resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 201)
            ValidaServerest.validarCadastroDeProdutoComSucesso(resposta)
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.logar(usuario).then(res => {
                    Serverest.salvarBearer(res)
                })
            })
        })

        it('Deve consultar os produtos da loja', () => {
            Serverest.buscarProdutos().then( resposta => {
                cy.contractValidation(resposta, 'get-produtos', 200)
                ValidaServerest.validarBuscaDeProdutos(resposta)
            })
        })

        it('Deve cadastrar carrinho com sucesso', () => {
            Serverest.cadastroDeCarrinhoComSucesso().then( resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 201) 
                ValidaServerest.validarCadastroDeCarrinhoComSucesso(resposta)  
            })
        })

        it('Deve buscar carrinho pelo _id com sucesso', () => {
            Serverest.buscarCarrinhoId().then( resposta => {
                cy.contractValidation(resposta, 'get-carrinhos-id', 200)
                ValidaServerest.validarBuscaDeCarrinhoPorIdComSucesso(resposta)  
            })
        })

        it('Deve buscar carrinho pelo _id sem sucesso', () => {
            Serverest.buscarCarrinhoIdSemSucesso().then( resposta => {
                cy.contractValidation(resposta, 'get-carrinhos-id', 400)
                ValidaServerest.validarBuscaDeCarrinhoPorIdSemSucesso(resposta)  
            })
        })
    })
})