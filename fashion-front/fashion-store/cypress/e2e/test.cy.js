describe('Redirect to Add Outfit Page', () => {
    it('should click the Add Outfit button and redirect to /outfits/add/:id', () => {
        
        cy.login();
        cy.visit('http://localhost:3000/outfits');
        cy.get('button').contains('Add Outfit').click();
        cy.url().should('include', '/outfits/add');
    });
});
