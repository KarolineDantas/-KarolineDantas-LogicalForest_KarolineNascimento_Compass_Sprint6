/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'


// Terceiro fluxo de compras da API Serverest
// • Realizar login sem sucesso (erros);
// • Realizar login com sucesso;
// • Buscar usuário por ID – erro;
// • Buscar usuário por ID – sucesso;
// • Listar produtos cadastrados;
// • Cadastrar carrinho com sucesso;
// • Buscar carrinho por ID sem sucesso;
// • Buscar carrinho por ID com sucesso;
// • Cancelar compra com sucesso.



describe('Casos de teste do fluxo 3', () => {

    it('Logar sem sucesso', () => {
        Serverest.logarSemSucesso().then( resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginSemSucesso(resposta)
        })
    })

    it('Tentativa de login sem email', () => {
        Serverest.loginSemEmail().then( resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginSemEmail(resposta)
        })
    })

    it('Tentativa de login sem senha', () => {
        Serverest.loginSemSenha().then( resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginSemSenha(resposta)
        })
    })

    it('Tentativa de login com e-mail inválido', () => {
        Serverest.loginEmailInvalido().then( resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginEmailInvalido(resposta)
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

        //problema  na url, não consegue pesquisar pelo id
        it('Deve buscar um usuário por _id sem sucesso', () => {
            Serverest.buscarUsuarioPorIdErro().then( resposta => {
                cy.contractValidation(resposta, 'get-usuarios-id', 400)
                ValidaServerest.validarBuscaDeUsuarioPorIdSemSucesso(resposta)
            })
        })

        //problema  na url, não consegue pesquisar pelo id
        it('Deve buscar um usuário por _id com sucesso', () => {
            Serverest.buscarUsuarioPorId().then( resposta => {
                cy.contractValidation(resposta, 'get-usuarios-id', 200)
                ValidaServerest.validarBuscaDeUsuarioPorIdSucesso(resposta)
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
        it('Deve buscar carrinho por _id sem sucesso', () => {
            Serverest.buscarCarrinhoPorIdSemSucesso()
            cy.get('@idCarrinho').then( resposta => {
                cy.contractValidation(resposta, 'get-carrinhos-id', 400) 
                ValidaServerest.validarBuscaDeCarrinhoPorIdComSucesso(resposta)
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

        //Mensagem de validação diferente da documentação
        it('Deve cancelar compra com sucesso', () => {
            Serverest.cancelarCompraComSucesso().then( resposta => {
                cy.contractValidation(resposta, 'delete-carrinhos', 200) 
                ValidaServerest.validarConclusaoDeComprasSucesso(resposta) 
            })
        })
    })
}) 