import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {
    //Ações que podemos realizar na API: buscar usuários, cadastrar novos usuários, realizar login...

    // Ações do primeiro fluxo 

    static cadastrarUsuarioComSucesso() {
        let usuario = Factory.gerarUsuario()

        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: false,
        })
    }

    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta) {
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    static buscarProdutoPorId() {
       cy.request(URL_PRODUTOS).then(res => {
        cy.wrap({
            _id: res.body._id
        }).as('idProduto')
       })
    }

    static buscarProdutoPorIdSemSucesso() {
        cy.request(URL_PRODUTOS).then(res => {
         cy.wrap({
             _id: '_id'
         }).as('idProduto')
        })
     }

    static buscarProdutoPorId2() {
        return cy.request({
        method: 'GET',
        url: 'URL_PRODUTOS' + Cypress.env('idBuscaDeProduto'),
     })
    }

    static cadastroDeCarrinhoComSucesso() {
        return cy.request({
            method: 'POST',
            url: 'https://serverest.dev/carrinhos',
            failOnStatusCode: false,
            body: {
                "produtos": [
                  {
                    "idProduto": "BeeJh5lz3k6kSIzA",
                    "quantidade": 1
                  }
                ]
              },
            auth: {
                bearer: Cypress.env('bearer'),
            }
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

    // Ações adicionadas no segundo fluxo
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

    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
        })
    }

    static buscarCarrinhoPorId() {
        cy.request(URL_CARRINHOS).then(res => {
            cy.wrap({
                _id: res.body._id
            }).as('idCarrinho')
           })
    }


    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
    }

    // Ações adicionadas no terceiro fluxo 

    static logarSemSucesso() {
        let usuario = Factory.gerarLogin()
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: usuario,
            failOnStatusCode: false,
        })
    }

    static loginSemEmail() {
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: {
                "email": "",
                "password": "teste"
              },
            failOnStatusCode: false,
        })
    }

    static loginSemSenha() {
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: {
                "email": "teste@gmail.com",
                "password": ""
              },
            failOnStatusCode: false,
        })
    }

    static loginEmailInvalido() {
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: {
                "email": "teste@tester",
                "password": "teste"
              },
            failOnStatusCode: false,
        })
    }

    static buscarUsuarioPorIdErro() {
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios/null',
            failOnStatusCode: false,
        })
    }

    static buscarUsuarioPorId() {
        cy.request({
            method: 'GET',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuario')}`,
            failOnStatusCode: false,
            _id: 'idUsuario'
        })
    }

    static buscarCarrinhoPorIdSemSucesso() {
        cy.request(URL_CARRINHOS).then(res => {
            cy.wrap({
                _id: res.body._id
            }).as('idCarrinho')
        })
    }

    static cancelarCompraComSucesso() {
        return cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/carrinhos/cancelar-compra',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer'),
            }
        })
    }

   










    

    
}
