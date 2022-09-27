import { or } from "ajv/dist/compile/codegen"

export default class ValidaServerest {
    //Validações das ações que podemos realizar na API: buscar usuários, cadastrar novos usuários, cadastrar produtos, entre outros.


    // Validações da rota LOGIN

    static validarLoginSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    static validarLoginSemEmail(resposta) {
        expect(resposta.body.message).to.be.eq('email não pode ficar em branco')
    }

    static validarLoginSemSenha(resposta) {
        expect(resposta.body.message).to.be.eq('Senha inválida, digite novamente')
    }

    static validarLoginEmailInvalido(resposta) {
        expect(resposta.body.message).to.be.eq('Email deve ser um email válido')
    }

    static validarLoginComSucesso(resposta) {
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('authorization')
    }


    // Validações da rota USUARIOS

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
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarCadastroAdmInvalido(resposta) {
        expect(resposta.body.administrador).to.be.eq('administrador deve ser true ou false')
    }

    static validarBuscaDeUsuarios(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(3)
    }

    static validarCadastroUsuarioSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarBuscaDeUsuarioPeloIdSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Usuário não encontrado')
    }

    static validarBuscaDeUsuarioPorIdSucesso(resposta) {
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idUsuario', resposta.body._id)
    }


    // Validações da rota PRODUTOS

    static validarBuscaDeProdutos(resposta) {
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }

    static validarCadastroProdutoSemLogin(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarProdutoDuplicado(resposta) {
        expect(resposta.body.message).to.be.eq('Já existe produto com esse nome')
    }

    static validarCadastroDeProdutoComSucesso(resposta) {
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validarProdutoQtdeInvalida(resposta) {
        expect(resposta.body.quantidade).to.be.eq('quantidade deve ser maior ou igual a 0')
    }

    static validarProdutoPrecoInvalido(resposta) {
        expect(resposta.body.preco).to.be.eq('preco deve ser um número positivo')
    }

    static validarEdicaoProdutoSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro alterado com sucesso')
    }

    static validarProdutoSemNome(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarBuscaDeProdutoPeloIdSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Produto não encontrado')
    }

    static validarBuscaDeProdutoPeloId(resposta) {
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static cadastroDeProdutoSemSerAdmin(resposta) {
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static edicaoDeProdutoSemSerAdmin(resposta) {
        expect(resposta.body.message).to.be.eq('Rota exclusiva para administradores')
    }


    // Validações da rota CARRINHOS

    static validarCadastroDeCarrinhoSemToken(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarConclusaoDeComprasSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
    }

    static validarCadastroCarrinhoProdutoInexistente(resposta) {
        expect(resposta.body.message).to.be.eq('Não é permitido ter mais de 1 carrinho')
    }

    static validarBuscaDeCarrinhoPorIdSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Carrinho não encontrado')
    }

    static validarBuscaDeCarrinhoPorIdComSucesso(resposta) {
        Cypress.env('idCarrinho', resposta.body._id)
    }

    static validarConclusaoDeComprasSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static cancelarCompraComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso | Não foi encontrado carrinho para esse usuário')
    }

    static validarCadastroDeCarrinhoComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        Cypress.env('idCarrinho', resposta.body._id)
    }
}