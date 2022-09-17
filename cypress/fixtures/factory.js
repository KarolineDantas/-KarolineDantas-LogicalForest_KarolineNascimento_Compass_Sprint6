const { faker } = require('@faker-js/faker');

export default class Factory {

    static gerarProduto(){
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.datatype.number(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number(),
        }
    }

    static gerarUsuario(){
        return {
            "nome": faker.name.firstName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": 'true',
        }
    }

    static gerarLogin(){
        return {
            "email": faker.internet.email(),
            "password": faker.internet.password(),
        }
    }

    static loginEmBranco() {
        return {
            "password": faker.internet.password(),
        }
    }

    static gerarInteiroAleatorio(){
        return faker.datatype.number(5)
    }
}