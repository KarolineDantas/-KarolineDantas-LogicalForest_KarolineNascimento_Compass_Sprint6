import { or } from "ajv/dist/compile/codegen"

export default class ValidaServerest {
    //Validações das ações que podemos realizar na API: buscar usuários, cadastrar novos usuários, realizar login...

    // Validações do primeiro fluxo 

    static validarCadastroUsuarioSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarLoginComSucesso(resposta) {
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('authorization')
    }

    static validarBuscaDeUsuarios(resposta) {
        expect(resposta.body.quantidade).to.be.greaterThan(3)
    }

    static validarBuscaDeProdutos(resposta) {
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }

    

    static validarConclusaoDeComprasSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso')
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
    

    static validarLoginSemEmail(resposta) {
        expect(resposta.body.message).to.be.eq('email não pode ficar em branco')
    }

    static validarLoginSemSenha(resposta) {
        expect(resposta.body.message).to.be.eq('Senha inválida, digite novamente')
    }

    static validarLoginEmailInvalido(resposta) {
        expect(resposta.body.message).to.be.eq('Email deve ser um email válido')
    }

    static validarBuscaDeUsuarioPorIdSemSucesso(resposta) {
        expect(resposta.status).to.be.equal(400)
        expect(resposta.body).to.haveOwnProperty('_id')
    }

   

    static validarConclusaoDeComprasSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static cancelarCompraComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Registro excluído com sucesso | Não foi encontrado carrinho para esse usuário')
    }

   

    static validarCadastroDeCarrinhoParaMesmoUsuario(resposta) {
        expect(resposta.body.message).to.be.eq('Não é permitido ter mais de 1 carrinho')
    }
    
    


    




    static validarCadastroDeProdutoComSucesso(resposta) {
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validarBuscaDeProdutoPeloId(resposta) {
        Cypress.env('idProdutoCadastrado', resposta.body._id)
    }

    static validarBuscaDeProdutoPeloIdSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Produto não encontrado')
    }

    static validarBuscaDeUsuarioPeloIdSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Usuário não encontrado')
    }

    static validarBuscaDeUsuarioPorIdSucesso(resposta) {
        expect(resposta.body).to.haveOwnProperty('_id')
        Cypress.env('idUsuario', resposta.body._id)
    }

    static validarCadastroDeCarrinhoComSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        Cypress.env('idCarrinho', resposta.body._id)
    }

    static validarBuscaDeCarrinhoPorIdComSucesso(resposta) {
        Cypress.env('idCarrinho', resposta.body._id)
    }

    static validarBuscaDeCarrinhoPorIdSemSucesso(resposta) {
        expect(resposta.body.message).to.be.eq('Carrinho não encontrado')
    }

    static validarCadastroCarrinhoProdutoInexistente(resposta) {
        expect(resposta.body.message).to.be.eq('Produto não encontrado')
    }

    static validarCadastroDeCarrinhoSemToken(resposta) {
        expect(resposta.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    static validarCadastroDeCarrinhoComProdutoDuplicado(resposta) {
        expect(resposta.body.message).to.be.eq('Não é permitido possuir produto duplicado')
    }
    
}