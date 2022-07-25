import user from '../../fixtures/user-credentials.json'

describe('Login tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Try to log with no credentials', () => {
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Invalid account');
    });

    it('Missing mail', () => {
        cy.get('[data-testid=login-password]')
            .type('password')
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Invalid account');
    });

    it('Missing password', () => {
        cy.get('[data-testid=login-email]')
            .type('samplee@test.fr')
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Invalid account');
    });


    it('Invalid credentials', () => {
        cy.get('[data-testid=login-email]')
            .type('wrong@mail.fr')
        cy.get('[data-testid=login-password]')
            .type('password')
        cy.get('[data-testid=login-button]').click();
        cy.get('#root').should('contain', 'Invalid account');
    });

    it('Logging in with right credentials', () => {
        let { email, password } = user.registered;
 
        cy.get('[data-testid=login-email]')
            .type(email)
            .should('have.value', email);
        cy.get('[data-testid=login-password]').type(password);
        cy.get('[data-testid=login-button]').click();
        //cy.get('#root').shouldNot('contain', 'You are now logged in');
        cy.contains('Log In').should('not.exist')
    });
});