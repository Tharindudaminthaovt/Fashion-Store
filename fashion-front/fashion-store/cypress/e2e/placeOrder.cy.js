describe('PlaceOrderItemList Component', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/place-orders');
    });

    it('displays the list of orders correctly', () => {
        cy.get('#all_orders_grid').should('exist');
        cy.get('#all_wishlist_item_container').children().should('have.length.greaterThan', 0);
        cy.get('.card').should('exist');
    });

    it('navigates to the edit page when the "Change" button is clicked', () => {
        cy.get('button').contains('CHANGE').first().click();
        cy.url().should('include', '/edit-orders');
    });

});
