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

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then(usuario => {
                Serverest.logar(usuario).then(res => {
                    Serverest.salvarBearer(res)
                })
            })
        })

        it('Deve consultar os produtos da loja', () => {
            Serverest.buscarProdutos().then(resposta => {
                cy.contractValidation(resposta, 'get-produtos', 200)
                ValidaServerest.validarBuscaDeProdutos(resposta)
            })
        })

        it('Deve tentar cadastrar carrinho sem token', () => {
            Serverest.cadastroCarrinhoSemToken().then(resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 401)
                ValidaServerest.validarCadastroDeCarrinhoSemToken(resposta)
            })
        })

        it('Deve cadastrar carrinho com sucesso', () => {
            Serverest.cadastroDeCarrinhoComSucesso().then(resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 201)
                ValidaServerest.validarCadastroDeCarrinhoComSucesso(resposta)
            })
        })

        it('Deve buscar carrinho pelo _id sem sucesso', () => {
            Serverest.buscarCarrinhoIdSemSucesso().then(resposta => {
                cy.contractValidation(resposta, 'get-carrinhos-id', 400)
                ValidaServerest.validarBuscaDeCarrinhoPorIdSemSucesso(resposta)
            })
        })

        it('Deve buscar carrinho pelo _id com sucesso', () => {
            Serverest.buscarCarrinhoId().then(resposta => {
                cy.contractValidation(resposta, 'get-carrinhos-id', 200)
                ValidaServerest.validarBuscaDeCarrinhoPorIdComSucesso(resposta)
            })
        })

        it('Deve cancelar compra sem sucesso', () => {
            Serverest.cancelarCompraSemSucesso().then( resposta => {
                cy.contractValidation(resposta, 'delete-carrinhos', 401) 
                ValidaServerest.validarConclusaoDeComprasSemSucesso(resposta) 
            })
        })

        it('Deve cancelar compra com sucesso', () => {
            Serverest.cancelarCompraComSucesso().then( resposta => {
                cy.contractValidation(resposta, 'delete-carrinhos', 200) 
                ValidaServerest.validarConclusaoDeComprasSucesso(resposta) 
            })
        })
    })

    context('Logar com sucesso pela segunda vez', () => {
        beforeEach('Logar', () => {
            Serverest.buscarSegundoUsuarioParaLogin()
            cy.get('@segundoUsuarioLogin').then(usuario => {
                Serverest.logar(usuario).then(res => {
                    Serverest.salvarBearer(res)
                })
            })
        })

        it('Deve consultar os produtos da loja', () => {
            Serverest.buscarProdutos().then(resposta => {
                cy.contractValidation(resposta, 'get-produtos', 200)
                ValidaServerest.validarBuscaDeProdutos(resposta)
            })
        })
        
        it('Deve concluir compra sem sucesso', () => {
            Serverest.concluirCompraSemSucesso().then( resposta => {
                cy.contractValidation(resposta, 'delete-carrinhos', 401) 
                ValidaServerest.validarConclusaoDeComprasSemSucesso(resposta) 
            })
        })

        it('Deve concluir compra com sucesso', () => {
            Serverest.concluirCompra().then( resposta => {
                cy.contractValidation(resposta, 'delete-carrinhos', 200) 
                ValidaServerest.validarConclusaoDeComprasSucesso(resposta) 
            })
        })
    })
})
