import { or } from "ajv/dist/compile/codegen"

export default class ValidaServerest {
    //Validações das ações que podemos realizar na API: buscar usuários, cadastrar novos usuários, realizar login...

    //Rota usuários
    static validarBuscaDeUsuarios(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(3)
    }

    static validarCadastroUsuarioSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarCadastroUsuarioSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Este email já está sendo usado')
    }

    static validarCadastroUsuarioEmailInvalido(resposta) {
        expect(resposta.body.message).to.be.eq('Email deve ser um email válido')
    }

    static validarCadastroUsuarioSenhaInvalida(resposta) {
        expect(resposta.body.message).to.be.eq('Senha deve conter no mínimo 4 caracteres')
    }

    static validarCadastroUsuarioNomeInvalido(resposta) {
        expect(resposta.body.message).to.be.eq('Nome inválido, tente novamente')
    }

    static validarLoginSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    static validarBuscaDeProdutos(resposta) {
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }

    static validarConclusaoDeComprasSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Não foi encontrado carrinho para esse usuário')
    }

    static validarConclusaoDeComprasSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }


    static validarBuscaDeProdutosPorId(resposta) {
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
        Cypress.env('idBuscaDeProduto', resposta.body,_id)
    }


    static validarBuscaDeUsuarioPorId(resposta) {
        expect(resposta.status).to.be.equal(200)
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('nome')
        expect(resposta.body).to.haveOwnProperty('email')
        expect(resposta.body).to.haveOwnProperty('password')
        expect(resposta.body).to.haveOwnProperty('_id')
    }

    static validarLoginComSucesso(resposta) {
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('authorization')
    }


    static validarCadastroDeProdutoComSucesso(resposta) {
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
    }

}