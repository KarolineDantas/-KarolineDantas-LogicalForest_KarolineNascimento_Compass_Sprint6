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

// static validarBuscaDeUsuarioPorIdSemSucesso(resposta) {
//     expect(resposta.status).to.be.equal(400)
//     expect(resposta.body.message).to.be.eq('Usuário não encontrado')
// }



// Testes Produtos
it('Deve buscar todos os produtos cadastrados', () => {
    Serverest.buscarProdutos().then(res => {
        ValidaServerest.validarBuscaDeProdutos(res)
    })
})

it('Deve deletar o produto cadastrado', () => {
    Serverest.deletarProdutoCadastrado().then( res => {
        cy.log(res)
    })
})

// static validarBuscaDeProdutosPorId(resposta) {
//     Cypress.env('idBuscaDeProduto', resposta.body)
// }

// static validarBuscaDeProdutosPorIdSemSucesso(resposta) {
//     Cypress.env('idBuscaDeProduto', resposta.body, _id)
//     expect(resposta.body.message).to.be.eq('Produto não encontrado')   
// }


// static buscarProdutoPorId() {
//     cy.request(URL_PRODUTOS).then(res => {
//         cy.wrap({
//             nome: res.body.produtos[0].nome,
//             preco: res.body.produtos[0].preco,
//             descricao: res.body.produtos[0].descricao,
//             quantidade: res.body.produtos[0].quantidade,
//             _id: res.body.produtos[0]._id,
//         }).as('idProduto')
//     })
// }

// static buscarProdutoPorIdSemSucesso() {
//     cy.request(URL_PRODUTOS).then(res => {
//         cy.wrap({
//             _id: res.body.usuarios[0]._id,
//         }).as('idProduto')
//     })
// }

// static buscarProdutoPorId2() {
//     return cy.request({
//         method: 'GET',
//         url: 'URL_PRODUTOS' + Cypress.env('idBuscaDeProduto'),
//     })
// }

// static cadastrarProdutoComSucesso() {
//     return cy.request({
//         method: 'POST',
//         url: URL_PRODUTOS,
//         body: {
//             "nome": "C3 MV Horizontal",
//             "preco": 47,
//             "descricao": "Mouse",
//             "quantidade": 381
//         },
//         failOnStatusCode: true,
//         auth: {
//             bearer: Cypress.env('bearer'),
//         }
//     })
// }

// static cadastrarProdutoComSucesso() {
//     let produto = Factory.gerarProduto()

//     return cy.request({
//         method: 'POST',
//         url: URL_PRODUTOS,
//         body: produto,
//         failOnStatusCode: true,
//         auth: {
//             bearer: Cypress.env("bearer")
//         }
//     })
// }

// static deletarProdutoCadastrado() {
//     return cy.request({
//         method: 'DELETE',
//         url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
//         auth: {
//             bearer: Cypress.env('bearer')
//         }
//     })
// }

// static deletarProdutoCadastrado() {
//     return cy.request({
//         method: 'DELETE',
//         url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
//         auth: {
//             bearer: Cypress.env('bearer')
//         }
//     })
// }


// static validarCadastroDeCarrinhoComProdutoDuplicado(resposta) {
//     expect(resposta.body.message).to.be.eq('Não é permitido possuir produto duplicado')
// }


// static validarCadastroDeCarrinhoParaMesmoUsuario(resposta) {
//     expect(resposta.body.message).to.be.eq('Não é permitido ter mais de 1 carrinho')
// }

// Testes Carrinhos

