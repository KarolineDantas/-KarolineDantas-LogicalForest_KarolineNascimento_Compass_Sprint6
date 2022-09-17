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


describe('Quarto fluxo para automação', () => {

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

    it('Deve tentar cadastrar carrinho sem token', () => {
        Serverest.cadastroDeCarrinhoSemToken().then( resposta => {
            cy.contractValidation(resposta, 'post-carrinhos', 401) 
            ValidaServerest.validarCadastroDeCarrinhoSemToken(resposta)  
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

        it('Deve cadastrar carrinho com sucesso', () => {
            Serverest.cadastroDeCarrinhoComSucesso().then( resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 201) 
                ValidaServerest.validarCadastroDeCarrinhoComSucesso(resposta)  
            })
        })

        it('Deve tentar cadastrar mais de um carrinho para o mesmo usuário', () => {
            Serverest.cadastroDeCarrinhoParaMesmoUsuario().then( resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 401) 
                ValidaServerest.validarCadastroDeCarrinhoParaMesmoUsuario(resposta)  
            })
        })
    })

    context('Logar', () => {
        beforeEach('Logar', () => {
            Serverest.segundoUsuarioParaLogin()
            cy.get('@segundoUsuarioLogin').then( usuario => {
                Serverest.logar(usuario).then(res => {
                    Serverest.segundoBearer(res)
                })
            })
        })

        it('Deve cadastrar carrinho com sucesso', () => {
            Serverest.cadastroDeCarrinhoComSucesso().then( resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 201) 
                ValidaServerest.validarCadastroDeCarrinhoComSucesso(resposta)  
            })
        })

        it('Deve tentar cadastrar carrinho com produto duplicado', () => {
            Serverest.cadastroDeCarrinhoComProdutoDuplicado().then( resposta => {
                cy.contractValidation(resposta, 'post-carrinhos', 400) 
                ValidaServerest.validarCadastroDeCarrinhoComProdutoDuplicado(resposta)  
            })
        })
    })
})   