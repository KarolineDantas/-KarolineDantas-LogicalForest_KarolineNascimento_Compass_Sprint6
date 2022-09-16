/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
import { templateSettings } from 'cypress/types/lodash'

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'


// Todos os testes aprendidos em vídeo ou feitos por mim

// Testes Login
it('Deve realizar o login com sucesso', () => {
    Serverest.buscarUsuarioParaLogin()
    cy.get('@usuarioLogin').then(usuario => {
        Serverest.logar(usuario).then(res => {
            ValidaServerest.validarLoginComSucesso(res)
            Serverest.salvarBearer(res)
        })
    })
})
context('Logar com sucesso', () => {
    beforeEach('Logar', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                Serverest.salvarBearer(res)
            })
        })
    })



    it('Deve postar um novo produto com sucesso', () => {
        Serverest.cadastrarProdutoComSucesso().then(res => {
            ValidaServerest.validarCadastroDeProdutoComSucesso(res)
        })
    })
})


// Testes Usuarios
it('Não deve postar um novo usuário administrador existente', () => {
    cy.postarUsuarioComSucesso().then(res => {
        expect(res.status).to.be.equal(200)
        expect(res).to.be.a('object')
    })
})

it('Deve tentar cadastrar um usuario', () => {
    Serverest.cadastroDeUsuario()
    cy.get('@cadastroUsuario').then(usuario => {
        Serverest.cadastro(usuario).then(resposta => {
            ValidaServerest.validarCadastroDeUsuario(resposta)
        })
    })
})

it('Deve buscar um usuário pelo _id', () => {
    Serverest.buscarUsuarioPorId().then(res => {
        ValidaServerest.validarBuscaDeUsuarioPorId(res)
        cy.log(res)
    })
})

it('Não deve postar um novo usuário administrador existente', () => {
    cy.postarUsuarioSemSucesso().then(res => {
        cy.contractValidation(res, 'post-usuarios', 400)
        expect(res.body.message).to.be.eq('Este email já está sendo usado')
    })
})

it('Deve buscar e salvar um usuário em um arquivo json', () => {
    let inteiro = Factory.gerarInteiroAleatorio()
    Serverest.buscarUsuarios().then(res => {
        cy.log(JSON.stringify(res.body.usuarios[0]))
        cy.writeFile('./cypress/fixtures/usuarios.json', res.body.usuarios[inteiro])
        ValidaServerest.validarBuscaDeUsuarios(res)
    })
})

it('Deve buscar o usuário de um arquivo json', () => {
    cy.fixture('usuario.json').then(json => {
        let usuario = {
            email: json.email,
            password: json.password
        }
        Serverest.logar(usuario).then(res => {
            ValidaServerest.validarLoginComSucesso(res)
            Serverest.salvarBearer(res)
        })
    })
})

it('Deve buscar todos os usuários cadastrados na Serverest', () => {
    Serverest.buscarUsuarios().then(res => {
        cy.contractValidation(res, 'get-usuarios', 200)
        ValidaServerest.validarBuscaDeUsuarios(res)
    })
})



// Testes Produtos
it('Deve buscar todos os produtos cadastrados', () => {
    Serverest.buscarProdutos().then(res => {
        ValidaServerest.validarBuscaDeProdutos(res)
    })
})


// Testes Carrinhos

