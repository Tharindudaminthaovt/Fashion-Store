describe('Login Functionality', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/login');
    });

    it('should log in the user with valid credentials and navigate to the home page', () => {
        // Fill in login form
        cy.get('input[placeholder="Email"]').type('admin@gmail.com');
        cy.get('input[placeholder="Password"]').type('1234');
        cy.get('button[type="submit"]').click();

        // Verify successful login alert
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Login successful');
        });

        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('should display an error message for invalid credentials', () => {
        // Fill in login form with invalid credentials
        cy.get('input[placeholder="Email"]').type('wronguser@example.com');
        cy.get('input[placeholder="Password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        // Verify error message is displayed
        cy.get('p.text-red-500').should(
            'contain.text',
            'Please provide a valid email and password!'
        );
    });
});
