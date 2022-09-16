import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {
    //Ações que podemos realizar na API: buscar usuários, cadastrar novos usuários, realizar login...

    //função 1

    static buscarProdutoPorId() {
       cy.request(URL_PRODUTOS).then(res => {
        cy.wrap({
            _id: res.body._id[0]._id
        }).as('idProduto')
       })
    }


    static deletarProdutoCadastrado() {
        return cy.request({
            method: 'DELETE',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static cadastrarUsuarioComSucesso() {
        let usuario = Factory.gerarUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: false,
        })
    }


    //função 2
    static cadastrarUsuarioSemSucesso() {
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": "Fulano da Silva",
                "email": "beltrano@qa.com.br",
                "password": "teste",
                "administrador": "true"
            },
            failOnStatusCode: false,
        })
    }

    static cadastroUsuarioEmailInvalido() {
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": "Fulano da Silva",
                "email": "teste@tester",
                "password": "teste123",
                "administrador": "true"
            },
            failOnStatusCode: false,
        })
    }

    static cadastroUsuarioSenhaInvalida() {
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": "Fulano da Silva",
                "email": "teste@gmail.com",
                "password": "a",
                "administrador": "true"
            },
            failOnStatusCode: false,
        })
    }

    static cadastroUsuarioNomeInvalido() {
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: {
                "nome": " ",
                "email": "teste@gmail.com",
                "password": "abcd",
                "administrador": "true"
            },
            failOnStatusCode: false,
        })
    }

    static logarSemSucesso() {
        let usuario = Factory.gerarLogin()
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: usuario,
            failOnStatusCode: false,
        })
    }

    //função 3
    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
        })
    }


    static concluirCompra() {
        return cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/carrinhos/concluir-compra',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer'),
            }
        })
    }

    static conclusaoCompra() {
        return cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/carrinhos/concluir-compra',
            failOnStatusCode: false,
        })
    }


    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
    }

    // Rota usuários, GET por ID

    static buscarUsuarioPorId() {
        cy.request({
            method: 'GET',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuario')}`,
            failOnStatusCode: false,
            _id: 'idUsuario'
        })
    }

   

    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta) {
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    static cadastrarProdutoComSucesso() {
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": "C3 MV Horizontal",
                "preco": 47,
                "descricao": "Mouse",
                "quantidade": 381
            },
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('bearer'),
            }
        })
    }

    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env("bearer")
            }
        })
    }
}