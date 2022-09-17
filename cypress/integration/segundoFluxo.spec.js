/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'


// Segundo fluxo de compras da API Serverest
// • Cadastrar usuário (erros); 
// • Cadastrar usuário com sucesso; 
// • Realizar login com sucesso; 
// • Listar produtos cadastrados; 
// • Cadastrar carrinho com sucesso;
// • Buscar carrinho por ID com sucesso;
// • Concluir compra com sucesso. 


describe('Segundo fluxo para automação', () => {

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

    it('Cadastro de usuário com sucesso', () => {
        Factory.gerarUsuario
        Serverest.cadastrarUsuarioComSucesso().then( resposta => {
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

        // retorna _id indefinido
        it('Deve buscar carrinho por _id com sucesso', () => {
            Serverest.buscarCarrinhoPorId()
            cy.get('@idCarrinho').then( resposta => {
                cy.contractValidation(resposta, 'get-carrinhos-id', 200) 
                ValidaServerest.validarBuscaDeCarrinhoPorIdComSucesso(resposta)
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