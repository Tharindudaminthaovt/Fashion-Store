describe('Add Product Items', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/additem');
    });

    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const name = `Sample Product-test ${randomNumber}`;

    it('should fill and submit the form successfully', () => {

        cy.get('#name').type(name);
        cy.get('#category').type('Electronics');
        cy.get('#description').type('High-quality electronic product');
        cy.get('#collection').type('Summer Collection');
        cy.get('#targetmarket').type('Youth');

        cy.get('input[placeholder="Variant (e.g., Color, Size)"]').first().type('Red');
        cy.get('input[placeholder="Price"]').first().type('50');

        cy.contains('Add Another Variant').click();
        cy.get('input[placeholder="Variant (e.g., Color, Size)"]').last().type('Blue');
        cy.get('input[placeholder="Price"]').last().type('60');

        cy.get('button[type="submit"]').click();
    });

    it('should visible the created item in the home page', () => {
        cy.login();
        cy.visit('http://localhost:3000/');
        cy.get('h1').should('contain.text', name);
    })

    it('should allow removing a variant', () => {
        cy.get('input[placeholder="Variant (e.g., Color, Size)"]').first().type('Red');
        cy.get('input[placeholder="Price"]').first().type('50');

        cy.contains('Add Another Variant').click();
        cy.get('input[placeholder="Variant (e.g., Color, Size)"]').last().type('Blue');
        cy.get('input[placeholder="Price"]').last().type('60');

        cy.get('input[placeholder="Variant (e.g., Color, Size)"]').should('have.length', 2);
        cy.contains('Remove').last().click();

        cy.get('input[placeholder="Variant (e.g., Color, Size)"]').should('have.length', 1);
    });

    it('should display validation error for empty fields', () => {
        cy.get('button[type="submit"]').click();

        cy.get('#name:invalid').should('exist');
        cy.get('#category:invalid').should('exist');
        cy.get('#description:invalid').should('exist');
        cy.get('#collection:invalid').should('exist');
        cy.get('#targetmarket:invalid').should('exist');
        cy.get('input[placeholder="Variant (e.g., Color, Size)"]:invalid').should('exist');
        cy.get('input[placeholder="Price"]:invalid').should('exist');
    });
});

describe('Update Item Automation Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/updateitem/123');
    });

    it('should fetch and display product data on load', () => {
        cy.intercept('GET', 'http://localhost:5000/api/items/items/123', {
            statusCode: 200,
            body: {
                _id: '123',
                name: 'Sample Product',
                category: 'Electronics',
                description: 'Sample description',
                collection: 'Summer Collection',
                targetmarket: 'Youth',
                variants: ['Color', 'Size'],
                prices: {
                    Color: 50,
                    Size: 60,
                },
            },
        }).as('getProduct');

        cy.wait('@getProduct');
        cy.get('input[name="name"]').should('have.value', 'Sample Product');
        cy.get('input[name="category"]').should('have.value', 'Electronics');
        cy.get('textarea[name="description"]').should('have.value', 'Sample description');
        cy.get('input[name="collection"]').should('have.value', 'Summer Collection');
        cy.get('input[name="targetmarket"]').should('have.value', 'Youth');
    });
});
