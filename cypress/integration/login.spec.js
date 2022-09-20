/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

describe('Testes para a rota de login', () => {

    it('Logar sem sucesso', () => {
        Serverest.logarSemSucesso().then(resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginSemSucesso(resposta)
        })
    })

    it('Tentativa de login sem email', () => {
        Serverest.loginSemEmail().then(resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginSemEmail(resposta)
        })
    })

    it('Tentativa de login sem senha', () => {
        Serverest.loginSemSenha().then(resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginSemSenha(resposta)
        })
    })

    it('Tentativa de login com e-mail inválido', () => {
        Serverest.loginEmailInvalido().then(resposta => {
            cy.contractValidation(resposta, 'post-login', 400)
            ValidaServerest.validarLoginEmailInvalido(resposta)
        })
    })

    it('Deve logar com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                Serverest.salvarBearer(res)
            })  
        })
    })    
})