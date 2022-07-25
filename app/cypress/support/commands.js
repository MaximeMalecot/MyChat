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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
    // cy.visit('/');
    // cy.get('[data-testid=login-email]')
    //     .type('samplee@test.fr')
    //     .should('have.value', 'samplee@test.fr');
    // cy.get('[data-testid=login-password]').type('azerty123');
    // cy.get('[data-testid=login-button]').click();
    // cy.get('#root').should('contain', 'You are now logged in');
    // cy.contains('Login').should('not.exist')

     cy.request({
        method: 'POST',
        url: 'http://localhost:3001/auth/login',
        body:{
            email: 'samplee@test.fr',
            password: 'azerty123'
        }
    })
    .then( res => { window.localStorage.setItem('token', JSON.stringify(res.body) )} );
});

//const COMMAND_DELAY = Cypress.env('COMMAND_DELAY') || 0;
const COMMAND_DELAY = 1000;
if (COMMAND_DELAY > 0) {
    for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
        Cypress.Commands.overwrite(command, (originalFn, ...args) => {
            const origVal = originalFn(...args);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(origVal);
                }, COMMAND_DELAY);
            });
        });
    }
}
