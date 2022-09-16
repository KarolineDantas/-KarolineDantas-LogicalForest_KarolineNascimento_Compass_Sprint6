/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'


// Segundo fluxo de compras da API Serverest. Este fluxo possui o foco em verificar erros que podem ser cometidos pelos usuário na área de cadastro.
// Casos de teste adicionados no fluxo 2: Tentativa de cadastro com email já utilizado, tentativa de cadastro com email inválido,
// tentativa de cadastro com senha inválida, tentativa de cadastro com nome inválido, tentativa de conclusão de compra.

describe('Casos de teste do fluxo 2', () => {

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
    

    it('Deve consultar os produtos da loja', () => {
        Serverest.buscarProdutos().then( resposta => {
            cy.contractValidation(resposta, 'get-produtos', 200)
            ValidaServerest.validarBuscaDeProdutos(resposta)
        })
    })

    it('Logar sem sucesso', () => {
        Serverest.logarSemSucesso().then( resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginSemSucesso(resposta)
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

        it('Deve concluir compra com sucesso', () => {
            Serverest.concluirCompra().then( resposta => {
                cy.contractValidation(resposta, 'delete-carrinhos', 200) 
                ValidaServerest.validarConclusaoDeComprasSucesso(resposta) 
            })
        })
    })

    it('Tentativa de conclusão de compra', () => {
        Serverest.conclusaoCompra().then( resposta => {
            cy.contractValidation(resposta, 'delete-carrinhos', 401)
            ValidaServerest.validarConclusaoDeComprasSemSucesso(resposta)     
        })
    })

}) 