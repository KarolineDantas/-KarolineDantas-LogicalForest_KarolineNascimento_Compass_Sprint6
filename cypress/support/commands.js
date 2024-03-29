// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Factory from '../fixtures/factory'

import Ajv from 'ajv'
const ajv = new Ajv({allErros: true, verbose: true, strict: false})

Cypress.Commands.add('contractValidation', (res, schema, status) =>{
    cy.log('Validando contrato para ' + schema + ' com status ' + status)
    cy.fixture(`schemas/${schema}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if(!valid){
            var errors = ''
            for(let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof errors.data}`
            }
            throw new Error('Erros encontrados na validação de contrato, por favor verifique: ' + errors)
    }
    return true
    })
} )

Cypress.Commands.add('postarUsuarioSemSucesso', () => {
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
            "nome": "Bruno Silva",
            "email": "bruno@qa.com.br",
            "password": "bbb",
            "administrador": "true",
        }
    })
})

Cypress.Commands.add('postarUsuarioComSucesso', () => {
    let usuario = Factory.gerarUsuario()
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: usuario,
    })
})

Cypress.Commands.add('rest', (method = 'GET', url = '/', body = null, failOnStatusCode = false) => {
    return cy.request({
        method: method,
        url: url,
        failOnStatusCode: failOnStatusCode,
        body: body
    })
})

Cypress.Commands.add('post', (method = 'POST', url = '/', failOnStatusCode = false) => {
    return cy.request({
            method: method,
            url: url,
            failOnStatusCode: failOnStatusCode,
})

})

Cypress.Commands.add('delete', (method = 'DELETE', url = '/', failOnStatusCode = false) => {
    return cy.request({
            method: method,
            url: url,
            failOnStatusCode: failOnStatusCode,
})

})

Cypress.Commands.add('logar', (email, senha) => {
    return cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            "email": email,
            "password": senha
        } 
    })
})

Cypress.Commands.add('buscarUsuarioParaLogin', () => {
    cy.rest('GET', '/usuarios').then( res => {
        expect(res.body).to.haveOwnProperty('usuarios')
        return {
            email: res.body.usuarios[0].email,
            senha: res.body.usuarios[0].password
    }})
})


Cypress.Commands.add('logar', (email, senha) => {
    return cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            "email": email,
            "password": senha
        } 
    })
})