/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'
//import cypress from 'cypress'

const URL_USUARIOS  = '/usuarios'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos'
const URL_CARRINHOS = '/carrinhos'

describe('Testes para a rota produtos', () => {
    
    it('Cadastro de usuário com sucesso', () => {
        Factory.gerarUsuario
        Serverest.cadastrarUsuarioComSucesso().then( resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 201)
            ValidaServerest.validarCadastroUsuarioSucesso(resposta)
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

        it('Deve tentar cadastrar um produto sem estar logado', () => {
            Serverest.cadastroProdutoSemLogin().then(resposta => {
                cy.contractValidation(resposta, 'post-produtos', 401)
                ValidaServerest.validarCadastroProdutoSemLogin(resposta)
            })
        })

        it('Deve tentar cadastrar um produto já existente', () => {
            Serverest.cadastroProdutoDuplicado().then(resposta => {
                cy.contractValidation(resposta, 'post-produtos', 400)
                ValidaServerest.validarProdutoDuplicado(resposta)
            })
        }) 

        it('Deve cadastrar um novo produto com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then(resposta => {
                cy.contractValidation(resposta, 'post-produtos', 200)
                ValidaServerest.validarCadastroDeProdutoComSucesso(resposta)
            })
        })

        it('Deve tentar cadastrar produto com quantidade menor que 0', () => {
            Serverest.cadastroProdutoQtdeInvalida().then(resposta => {
                cy.contractValidation(resposta, 'post-produtos', 400)
                ValidaServerest.validarProdutoQtdeInvalida(resposta)
            })
        })

        it('Deve tentar cadastrar produto com preço negativo', () => {
            Serverest.cadastroProdutoPrecoInvalido().then(resposta => {
                cy.contractValidation(resposta, 'post-produtos', 400)
                ValidaServerest.validarProdutoPrecoInvalido(resposta)
            })
        })

        it('Deve editar um produto com sucesso', () => {
            Serverest.editarProdutoComSucesso().then(resposta => {
                cy.contractValidation(resposta, 'put-produtos-id', 200) 
                ValidaServerest.validarEdicaoProdutoSucesso(resposta)
            })
        })

        it('Deve cadastrar um produto sem nome', () => {
            Serverest.cadastroSemNome().then(resposta => {
                ValidaServerest.validarProdutoSemNome(resposta)
            })
        })

        it('Deve buscar o produto pelo id sem sucesso', () => {
            Serverest.buscarProdutoPeloIdSemSucesso().then(resposta => {
                cy.contractValidation(resposta, 'get-produtos-id', 400) 
                ValidaServerest.validarBuscaDeProdutoPeloIdSemSucesso(resposta)
            })
        })

        it('Deve buscar o produto pelo id com sucesso', () => {
            Serverest.buscarProdutoCadastradoPeloId().then(resposta => {
                cy.contractValidation(resposta, 'get-produtos-id', 200) 
                ValidaServerest.validarBuscaDeProdutoPeloId(resposta)
            })
        })
    })

    it('Cadastro de usuário não administrador com sucesso', () => {
        Serverest.cadastrarUsuarioNaoAdm().then( resposta => {
            cy.contractValidation(resposta, 'post-usuarios', 201)
            ValidaServerest.validarCadastroUsuarioSucesso(resposta)
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.buscarSegundoUsuarioParaLogin()
            cy.get('@segundoUsuarioLogin').then( usuario => {
                Serverest.logar(usuario).then(res => {
                    Serverest.salvarBearer(res)
                })
            })
        })

        it('Deve tentar cadastrar um produto sem ser administrador', () => {
            Serverest.cadastroProdutoSemSerAdmin().then(resposta => {
                cy.contractValidation(resposta, 'post-produtos', 403)
                ValidaServerest.cadastroDeProdutoSemSerAdmin(resposta)
            })
        })

        it('Deve tentar editar um produto sem ser administrador', () => {
            Serverest.editarProdutoSemSerAdmin().then(resposta => {
                cy.contractValidation(resposta, 'put-produtos-id', 403)
                ValidaServerest.edicaoDeProdutoSemSerAdmin(resposta)
            })
        })
    })
})