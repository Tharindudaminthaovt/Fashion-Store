describe('Create Outfit Navigation', () => {
    before(() => {
        // Visit the main outfits page
        cy.login();
        cy.visit('http://localhost:3000/outfits');
    });

    it('should navigate to the outfit creation page when "Add Outfit" is clicked', () => {
        // verify button exists
        cy.get('button').contains('Add Outfit').should('be.visible');
        cy.get('button').contains('Add Outfit').click();

        // check the url
        cy.url().should('include', '/outfits/add');
    });
});

describe('Add items to outfit', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/outfits/add');
    });

    it('should allow selecting multiple items for an outfit', () => {
        // select the first item
        cy.get('.search-area #shared-item-card').eq(0).click();

        // verify selected items are shown in the summary
        cy.get('.box').find('#shared-item-card').should('exist');
    });
});

describe('Submit outfit creation form', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/outfits/add');
    });

    it('should create an outfit and redirect to the outfit list page', () => {
        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        // input rest of the details
        cy.get('input[name="name"]').type(`Casual Weekend Outfit-test ${randomNumber}`);
        cy.get('input[name="occasion"]').type('Casual');
        cy.get('textarea[name="description"]').type('A perfect outfit for a relaxed weekend outing.');
        cy.get('.search-area #shared-item-card').eq(0).click();

        // submit the form
        cy.get('button').contains('Save Outfit').click();

        // get success message
        cy.get('.alert').should('be.visible')
        cy.get('.alert').should('contain.text', 'Outfit created successfully!')

        // verify redirection to the outfit detail page
        cy.url().should('include', '/outfits/');
        cy.get('.outfit-name').contains(`Casual Weekend Outfit-test ${randomNumber}`).should('exist');

    });
});

describe('Navigate to outfit edit page', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/outfits');
    });

    it('should navigate to the edit page when an outfit card is clicked', () => {
        // click the first outfit
        cy.get('.outfit-card').eq(0).click();

        // verify redirection to the outfit edit page
        cy.url().should('include', '/outfits/edit/');
    });
});

describe('Submit outfit edit form', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/outfits');
    });

    it('should edit an outfit and redirect to the outfit main page', () => {
        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        // click the first outfit
        cy.get('.outfit-card').eq(0).click();

        // verify redirection to the outfit edit page
        cy.url().should('include', '/outfits/edit/');
        cy.wait(3000);

        // input new details
        cy.get('input[name="name"]').clear().type(`Updated Casual Weekend Outfit-test ${randomNumber}`);
        cy.get('input[name="occasion"]').clear().type('Casual');
        cy.get('textarea[name="description"]').clear().type('A perfect outfit for formal occasions.');

        // submit the form
        cy.get('button').contains('Update Outfit').click();

        // verify redirection to the outfit detail page
        cy.url().should('include', '/outfits/');
        cy.get('.outfit-name').contains(`Updated Casual Weekend Outfit-test ${randomNumber}`).should('exist');
    });
});

