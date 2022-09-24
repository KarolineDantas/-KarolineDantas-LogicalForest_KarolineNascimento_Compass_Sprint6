import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {
    //Ações que podemos realizar na API: buscar usuários, cadastrar novos usuários, realizar login...

    // Ações da rota LOGIN

    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static salvarBearer(resposta) {
        Cypress.env('bearer', resposta.body.authorization.slice(7))
    }

    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[1].email,
                password: res.body.usuarios[1].password
            }).as('usuarioLogin')
        })
    }

    // verificar se o usuário selecionado possui adm false
    static buscarSegundoUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[4].email,
                password: res.body.usuarios[4].password
            }).as('segundoUsuarioLogin')
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



    // Ações da rota USUARIO


    static buscarUsuarios() {
        return cy.rest('GET', URL_USUARIOS)
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

    static buscarUsuarioPorId() {
        return cy.request({
            method: 'GET',
            url: `${URL_USUARIOS}/${Cypress.env('idUsuario')}`,
            failOnStatusCode: false,
        })
    }


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



    // Ações da rota PRODUTOS

    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static cadastroProdutoSemLogin() {
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: false,
        })
    }

    static cadastroProdutoDuplicado() {

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static cadastroProdutoSemSerAdmin() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: produto,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }


    // Verificar se já existem um produto com o mesmo nome 
    static cadastroSemNome() {

        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                "nome": " ",
                "preco": 3,
                "descricao": "Mouse",
                "quantidade": 381
              },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
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

    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    static buscarProdutoCadastradoPeloId() {
        return cy.request({
            method: 'GET',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
        })
    }

    static buscarProdutoPeloIdSemSucesso() {
        return cy.request({
            method: 'GET',
            url: 'https://serverest.dev/produtos/BeeJh5lz3k6kSIz',
            failOnStatusCode: false,
        })
    }


    static buscarProdutoCadastradoPeloId() {
        return cy.request({
            method: 'GET',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
        })
    }


     // Verificar se já existem um produto com o mesmo nome 
    static editarProdutoComSucesso() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'PUT',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            body: produto,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    // Ao colocar a URL_PRODUTOS, o código abaixo gera erro 405 (ver mapa mental). 
    // Dessa forma foi necessário colocar a versão extensa da URL.

    static editarProdutoSemSerAdmin() {
        let produto = Factory.gerarProduto()

        return cy.request({
            method: 'PUT',
            url: `${URL_PRODUTOS}/${Cypress.env('idProdutoCadastrado')}`,
            body: produto,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }




    // Ações para a rota CARRINHOS

    static cadastroDeCarrinhoComSucesso() {
        return cy.request({
            method: 'POST',
            url: 'https://serverest.dev/carrinhos',
            body: {
                "produtos": [
                    {
                        "idProduto": "BeeJh5lz3k6kSIzA",
                        "quantidade": 1
                    }
                ]
            },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearer'),
            }
        })
    }

    static cadastroCarrinhoSemToken() {
        return cy.request({
            method: 'POST',
            url: 'https://serverest.dev/carrinhos',
            body: {
                "produtos": [
                    {
                        "idProduto": "BeeJh5l",
                        "quantidade": 1
                    }
                ]
            },
            failOnStatusCode: false,
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

    static concluirCompraSemSucesso() {
        return cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/carrinhos/concluir-compra',
            failOnStatusCode: false,
        })
    }

    static buscarCarrinhoPorId() {
        cy.request(URL_CARRINHOS).then(res => {
            cy.wrap({
                _id: res.body._id
            }).as('idCarrinho')
        })
    }

    static buscarCarrinhoId() {
        return cy.request({
            method: 'GET',
            url: `${URL_CARRINHOS}/${Cypress.env('idCarrinho')}`,
            failOnStatusCode: false,
        })
    }

    static buscarCarrinhoIdSemSucesso() {
        return cy.request({
            method: 'GET',
            url: 'https://serverest.dev/carrinhos/null',
            failOnStatusCode: false,
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

    static cancelarCompraSemSucesso() {
        return cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/carrinhos/cancelar-compra',
            failOnStatusCode: false,
        })
    }

    static cadastroDeCarrinhoComProdutoDuplicado() {
        return cy.request({
            method: 'POST',
            url: 'https://serverest.dev/carrinhos',
            failOnStatusCode: false,
            body: {
                "produtos": [
                    {
                        "idProduto": "BeeJh5lz3k6kSIzA",
                        "quantidade": 1,
                        "idProduto": "BeeJh5lz3k6kSIzA",
                        "quantidade": 4
                    }
                ]
            },
            auth: {
                bearer: Cypress.env('bearer'),
            }
        })
    }
}