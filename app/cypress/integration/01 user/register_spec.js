import user from '../../fixtures/user-credentials.json'

function fillFields( fields ){
    for(const [key, value] of Object.entries(fields) ){
        cy.get(`[data-testid=register-${key}`)
            .then( el => cy.wrap(el).type(value));
    }
};

function generateString(len){
    let charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
    let res = '';
    while (len--) res += charset[Math.random() * charset.length | 0];
    return res;
};

describe('Register', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid=register-button]').click();
    });

    it('Try to register with an empty form', () => {
        cy.get('[data-testid=signup-button]').click();
        cy.get('#root').contains("Account created").should("not.exist");
    });

    it('Missing mail -> invalid credentials', () => {
        let { firstname, lastname, password } = user.base;
        fillFields({ firstname, lastname, password });
        cy.get('[data-testid=signup-button]').click();
        cy.get('#root').contains("Account created").should("not.exist");
    });

    it('valid from - But mail already taken', () => {
        let { firstname, lastname, password } = user.base;
        let { email } = user.registered;
        fillFields({ email, firstname, lastname, password });
        cy.get('[data-testid=signup-button]').click();
        cy.get('#root').contains("Account created").should("not.exist");
    });

    it('Missing password -> invalid password error', () => {
        let { email, firstname, lastname } = user.base;
        fillFields({ email, firstname, lastname});
        cy.get('[data-testid=signup-button]').click();
        cy.get('#root').contains("Account created").should("not.exist");
    });

    it('Valid user - should work', () => {
        let { email, firstname, lastname, password } = user.base;
        email = generateString(10) + email;
        fillFields({ email, password, firstname, lastname});
        cy.get('[data-testid=signup-button]').click();
        cy.get('#root').should('contain', 'Account created');
    });


});