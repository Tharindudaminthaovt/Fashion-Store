describe('Tailor User Automation Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/tailor');
    });

    it('should render the form correctly', () => {
        cy.get('h2').should('contain.text', 'Tailor Form');
        cy.get('input#name').should('exist');
        cy.get('input#email').should('exist');
        cy.get('input#category').should('exist');
        cy.get('textarea#description').should('exist');
        cy.get('input#speciality').should('exist');
        cy.get('input#targetmarket').should('exist');
        cy.get('input#image').should('exist');
        cy.get('input#rating').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('should allow user to fill the form', () => {
        cy.get('input#name').type('John Doe').should('have.value', 'John Doe');
        cy.get('input#email').type('john@example.com').should('have.value', 'john@example.com');
        cy.get('input#category').type('Fashion').should('have.value', 'Fashion');
        cy.get('textarea#description').type('Experienced tailor').should('have.value', 'Experienced tailor');
        cy.get('input#speciality').type('Suits').should('have.value', 'Suits');
        cy.get('input#targetmarket').type('Professionals').should('have.value', 'Professionals');
        cy.get('input#image').type('http://example.com/image.jpg').should('have.value', 'http://example.com/image.jpg');
        cy.get('input#rating').type('4').should('have.value', '04');
    });

});

describe.only('Tailor Admin Automation Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/admin-tailors');
    });

    it('should render the Manage Tailors page', () => {
        cy.get('h1').should('contain.text', 'Manage Tailors');
        cy.get('button').contains('Create New Tailor').should('exist');
    });

    it('should show loading message when data is being fetched', () => {
        cy.get('p').should('contain.text', 'Loading...');
    });

    it('should navigate to the Create New Tailor page on button click', () => {
        cy.get('button').contains('Create New Tailor').click();
        cy.url().should('include', '/tailor');
    });

    it('should navigate to the Update Tailor page when Update button is clicked', () => {
        cy.get('.grid > div').first().within(() => {
            cy.get('button').contains('Update').click();
        });
        cy.url().should('include', '/tailorupdate');
    });

    it('should confirm before deleting a tailor', () => {
        cy.get('.grid > div').first().within(() => {
            cy.get('button').contains('Delete').click();
        });
        cy.on('window:confirm', (text) => {
            expect(text).to.eq('Are you sure you want to delete this tailor?');
        });
    });
});
