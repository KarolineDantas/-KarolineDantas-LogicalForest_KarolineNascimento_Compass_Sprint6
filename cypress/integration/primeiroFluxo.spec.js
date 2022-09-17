/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'


// Primeiro fluxo da API Serverest
// • Cadastrar usuário sucesso; 
// • Realizar login com sucesso; 
// • Listar produtos cadastrados; 
// • Buscar produto por ID; 
// • Cadastrar carrinho com sucesso;
// • Concluir compra com sucesso. 


describe('Primeiro fluxo para automação', () => {

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

        // retorna _id indefinido
        it('Deve buscar um produto pelo _id sem sucesso', () => {
            Serverest.buscarProdutoPorIdSemSucesso()
            cy.get('@idProduto').then(resposta => {
                cy.contractValidation(resposta, 'get-produtos-id', 400) 
                ValidaServerest.validarBuscaDeProdutosPorIdSemSucesso(resposta)
            })
        })

        // retorna _id indefinido
        it('Deve buscar um produto pelo _id com sucesso', () => {
            Serverest.buscarProdutoPorId()
            cy.get('@idProduto').then(resposta => {
                cy.contractValidation(resposta, 'get-produtos-id', 200) 
                ValidaServerest.validarBuscaDeProdutosPorId(resposta)
            })
        })

        it('Deve cadastrar carrinho com sucesso', () => {
            Serverest.cadastroDeCarrinhoComSucesso().then( resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 201) 
                ValidaServerest.validarCadastroDeCarrinhoComSucesso(resposta)  
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
