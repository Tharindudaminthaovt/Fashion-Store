describe('Create About Us Page', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/createaboutus');
    });

    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const name = `Test Title - ${randomNumber}`

    it('should render the Create About Us form', () => {
        cy.get('h2').should('contain.text', 'Create About Us Entry');
        cy.get('form').within(() => {
            cy.get('input[type="text"]').should('have.length', 2);
            cy.get('textarea').should('exist');
            cy.get('button[type="submit"]').should('exist').and('not.be.disabled');
        });
    });

    it('should show validation errors when required fields are empty', () => {
        cy.get('button[type="submit"]').click();
        cy.get('input:invalid').should('have.length', 1);
        cy.get('textarea:invalid').should('have.length', 1);
    });

    it('should allow the user to fill out the form', () => {
        cy.get('input[type="text"]').first().type(name).should('have.value', name);
        cy.get('textarea').type('This is the content for About Us.').should('have.value', 'This is the content for About Us.');
        cy.get('input[type="text"]').eq(1).type('https://example.com/image.jpg').should('have.value', 'https://example.com/image.jpg');
    });

    it('should submit the form successfully', () => {
        cy.get('input[type="text"]').first().type(name);
        cy.get('textarea').type('This is the content for About Us.');
        cy.get('input[type="text"]').eq(1).type('https://example.com/image.jpg');
        cy.get('button[type="submit"]').click();
    });
});

describe.only('AboutUsList Component', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/displayabus');
    });

    it('displays the About Us entries', () => {
        cy.get('h2').should('contain.text', 'About Us Entries');
        cy.get('.aboutus-entry').should('exist');
    });

    it('deletes an About Us entry', () => {
        cy.get('.aboutus-entry').first().within(() => {
            cy.get('button').contains('Delete').click();
        });
        cy.on('window:confirm', () => true);
    });

    it('updates an About Us entry', () => {
        cy.get('.aboutus-entry').first().within(() => {
            cy.get('button').contains('Update').click();
        });
        cy.url().should('include', '/update/');
    });

    it('sets an entry as the current About Us', () => {
        cy.get('.aboutus-entry').first().within(() => {
            cy.get('button').contains('Set as Current').click();
        });
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Current About Us has been updated successfully');
        });
    });
});

describe('CurrentAboutUs Component', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/displayabus');
    });

    it('displays a loading state initially', () => {
        cy.contains('Loading...').should('be.visible');
    });

    it('displays the current About Us entry when available', () => {
        cy.get('.about-us-details').within(() => {
            cy.get('h3').should('exist');
            cy.get('p').should('exist');
            cy.get('img').should('exist');
        });
    });

    it('shows a message when no current About Us entry is available', () => {
        cy.contains('No current About Us entry is available').should('be.visible');
    });
});
