// import user from '../../fixtures/user-credentials.json'
// import moment from 'moment';

// function fillFields( fields ){
//     for(const [key, value] of Object.entries(fields) ){
//         cy.get(`[data-testid=register-${key}`)
//             .then( el => cy.wrap(el).type(value));
//     }
// };

// function getBDate(age = 14){
//     return moment().subtract(age, 'years').format('YYYY-MM-DD').toString();
// }

// function generateString(len){
//     let charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
//     let res = '';
//     while (len--) res += charset[Math.random() * charset.length | 0];
//     return res;
// };

// describe('Register', () => {
//     beforeEach(() => {
//         cy.visit('/');
//     });

//     it('Try to register with an empty form', () => {
//         cy.get('[data-testid=signup-button]').click();
//         cy.get('#root').should('contain', 'Missing field(s)');
//     });

//     it('Missing mail -> invalid credentials', () => {
//         let { email, firstname, lastname, password } = user.base;
//         fillFields({ firstname, lastname, birthdate: getBDate(14), password, "password-bis": password });
//         cy.get('[data-testid=signup-button]').click();
//         cy.get('#root').should('contain', 'Missing field(s)');
//     });

//     it('valid from - Mail already taken', () => {
//         let { firstname, lastname, password } = user.base;
//         let { email } = user.valid;
//         fillFields({ email, firstname, lastname, birthdate: getBDate(14), password, "password-bis": password });
//         cy.get('[data-testid=signup-button]').click();
//         cy.get('#root').should('contain', 'Mail already used');
//     });

//     it('Missing password -> invalid password error', () => {
//         let { email, firstname, lastname, password } = user.base;
//         fillFields({ email, firstname, lastname, birthdate: getBDate(14)});
//         cy.get('[data-testid=signup-button]').click();
//         cy.get('#root').should('contain', 'Invalid password');
//     });

//     it('Password too short', () => {
//         let { email, firstname, lastname } = user.base;
//         let birthdate = getBDate(14);
//         let password = generateString(6);
//         fillFields({ email, firstname, lastname, birthdate, password, "password-bis": password});
//         cy.get('[data-testid=signup-button]').click();
//         cy.get('#root').should('contain', 'Invalid password');
//     });

//     it('Password too long', () => {
//         let { email, firstname, lastname } = user.base;
//         let birthdate = getBDate(14);
//         let password = generateString(41);
//         fillFields({ email, firstname, lastname, birthdate, password, "password-bis": password});
//         cy.get('[data-testid=signup-button]').click();
//         cy.get('#root').should('contain', 'Invalid password');
//     });

//     it('Passwords not matching', () => {
//         let { email, firstname, lastname, password } = user.base;
//         let birthdate = getBDate(14);
//         fillFields({ email, firstname, lastname, birthdate, password});
//         cy.get('[data-testid=signup-button]').click();
//         cy.get('#root').should('contain', 'The passwords don\'t match');
//     });



//     // it('Invalid credentials', () => {
//     //     cy.get('[data-testid=login-email]')
//     //         .type('wrong@mail.fr')
//     //     cy.get('[data-testid=login-password]')
//     //         .type('password')
//     //     cy.get('[data-testid=login-button]').click();
//     //     cy.get('#root').should('contain', 'Invalid credentials');
//     // });

//     // it('Logging in with right credentials', () => {
//     //     cy.get('[data-testid=login-email]')
//     //         .type('samplee@test.fr')
//     //         .should('have.value', 'samplee@test.fr');
//     //     cy.get('[data-testid=login-password]').type('azerty123');
//     //     cy.get('[data-testid=login-button]').click();
//     //     cy.get('#root').should('contain', 'You are now logged in');
//     //     cy.contains('Login').should('not.exist')
//     // });
// });