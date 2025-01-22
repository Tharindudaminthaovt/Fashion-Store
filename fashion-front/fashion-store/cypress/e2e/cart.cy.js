describe.only('Home Page and Cart Functionality', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/');
    });

    it('should display items on the home page', () => {
        cy.get('.row').should('be.visible');
        cy.get('.col-md-4').should('have.length.greaterThan', 0);
    });

    it('should increase cart count by 1 when an item is added to the cart', () => {

        cy.get('a.nav-link')
            .invoke('text')
            .then((text) => {
                const initialCount = parseInt(text.match(/\d+/)[0]);

                cy.get('.col-md-4')
                    .first()
                    .find('button')
                    .contains('add to cart')
                    .click();

                // verify the cart count increases by 1
                cy.get('a.nav-link').should('contain.text', `Cart ${initialCount + 1}`);
            });
    });
});

describe('Cart Page Functionality', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/cart');
    });

    it('should display cart items correctly', () => {
        cy.get('.cartitem').should('have.length.greaterThan', 0);
        cy.get('.cartitem').first().within(() => {
            cy.get('p').contains('Price').should('be.visible');
            cy.get('p').contains('Quantity').should('be.visible');
        });
    });

    it('should increase item quantity and update the total', () => {
        cy.get('.cartitem').first().within(() => {
            cy.get('.fa-plus-square').click();
        });

        cy.get('.cartitem').first().find('b').should('contain.text', '2');

        cy.get('h1').should('contain.text', 'subtotal');
    });

    it('should decrease item quantity and update the total', () => {
        cy.get('.cartitem').first().within(() => {
            cy.get('.fa-minus-square').click();
        });

        cy.get('.cartitem').first().find('b').should('contain.text', '1');

        cy.get('h1').should('contain.text', 'subtotal');
    });

    it('should remove an item from the cart', () => {
        cy.get('.cartitem').first().within(() => {
            cy.get('.fa-trash').click();
        });

        cy.get('.cartitem').should('have.length.lessThan', 1);
    });

    it('should display the "Pay Now" button and navigate on click', () => {

        cy.get('button').contains('pay now').should('be.visible').click();
        cy.url().should('include', '/payment');
    });
});
