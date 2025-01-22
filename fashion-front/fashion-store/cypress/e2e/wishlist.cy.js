describe('Create Wishlist Navigation', () => {
    before(() => {
        // Visit the main page
        cy.login();
        cy.visit('http://localhost:3000/wishlist');
    });

    it('should navigate to the wishlist creation page when "Add Wishlist" is clicked', () => {

        cy.get('button').contains('Add Wishlist').should('be.visible');
        cy.get('button').contains('Add Wishlist').click();

        // check the url
        cy.url().should('include', '/addwishlist');
    });
});

describe('Create Wishlist', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/addwishlist');
    });

    it('should create a wishlist and redirect to the wishlist main page', () => {
        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        // input rest of the details
        cy.get('input[name="name"]').type(`Wishlist-test ${randomNumber}`);
        cy.get('input[name="notes"]').type('Lorem Ipsum');
        cy.get('input[name="image"]').type('https://picsum.photos/200/300');

        // submit the form
        cy.get('button').contains('Add to Wishlist').click();

        cy.url().should('include', '/wishlist');

        cy.get('[id^="all_wishlist_item_name_"]').should(($elements) => {
            const found = $elements.toArray().some((el) => el.textContent.includes(`Wishlist-test ${randomNumber}`));
            expect(found).to.be.true;
        });
    })
});

describe('Navigate to wishlist edit page', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/wishlist');
    });

    it('should navigate to the edit page when a wishlist item\'s edit button is clicked', () => {

        cy.get('[id^="wishlist_edit_btn_"]').first().click();

        // verify redirection to the wishlist edit page
        cy.url().should('include', '/wishlist/');
    });
});

describe('Submit wishlist edit form', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/wishlist');
    });

    it('should edit a wishlist and redirect to the main page', () => {
        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        // click the first item
        cy.get('[id^="wishlist_edit_btn_"]').first().click();

        // verify redirection to the wishlist edit page
        cy.url().should('include', '/wishlist/');
        cy.wait(3000);

        // input new details
        cy.get('input[name="name"]').clear().type(`Updated Wishlist-test ${randomNumber}`);
        cy.get('input[name="notes"]').type('Lorem Ipsum');

        // submit the form
        cy.get('button').contains('Save').click();

        cy.visit('http://localhost:3000/wishlist');
        cy.wait(3000);

        cy.get('[id^="all_wishlist_item_name_"]').should(($elements) => {
            const found = $elements.toArray().some((el) => el.textContent.includes(`Updated Wishlist-test ${randomNumber}`));
            expect(found).to.be.true;
        });
    });
});

describe('Order checkout', () => {
    before(() => {
        cy.login();
        cy.visit('http://localhost:3000/wishlist');
    });
    var randomNumber;
    it('should create a new outfit', () => {
        randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        cy.get('button').contains('Add Wishlist').click();

        // input rest of the details
        cy.get('input[name="name"]').type(`Order checkout-test ${randomNumber}`);
        cy.get('input[name="notes"]').type('Lorem Ipsum');
        cy.get('input[name="image"]').type('https://picsum.photos/200/300');

        // submit the form
        cy.get('button').contains('Add to Wishlist').click();
    });

    it('add items to an outfit and checkout the order', () => {
        cy.visit('http://localhost:3000/wishlist');
        cy.wait(3000);

        cy.get('[id^="all_wishlist_item_name_"]').filter((index, el) => {
            return el.textContent.trim() === `Order checkout-test ${randomNumber}`;
        }).then(($el) => {
            cy.wrap($el)
                .parents('.wishlist-card')
                .find('[id^="wishlist_edit_btn_"]')
                .click(); // click on the edit button
        });

        // moved to edit page
        cy.url().should('include', '/wishlist/');

        // check selected items list is empty
        cy.get('[id^="box-container"]').invoke('text').should('be.empty');

        // add item to the selected items list
        cy.get('.list-group #shared-item-card').eq(0).click();
        cy.get('button').contains('Save').click();

        // checkout the order
        cy.get('button').contains('Checkout').click();

        // TODO: checkout
    })
});
