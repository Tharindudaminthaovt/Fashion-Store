describe('SearchResults Page Automation Tests', () => {
    const sampleSearchResults = [
        {
            "_id": "677aa9df6457f1aa0459622b",
            "name": "Classic T-Shirt",
            "variants": [
                "Small",
                "Medium",
                "Large"
            ],
            "prices": {
                "Small": 10,
                "Medium": 15,
                "Large": 20
            },
            "category": "Clothing",
            "image": "https://substackcdn.com/image/fetch/w_848,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5873f69-1bb2-4056-94fa-a4b100d0e428_800x1200.png",
            "description": "A timeless classic for your wardrobe.",
            "targetmarket": "Adults",
            "rating": 0,
            "__v": 0
        },
        {
            "_id": "677aa9e56457f1aa0459622d",
            "name": "Vintage Denim Jacket",
            "variants": [
                "Small",
                "Medium",
                "Large",
                "X-Large"
            ],
            "prices": {
                "Small": 50,
                "Medium": 55,
                "Large": 60,
                "X-Large": 65
            },
            "category": "Clothing",
            "image": "https://substackcdn.com/image/fetch/w_848,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5873f69-1bb2-4056-94fa-a4b100d0e428_800x1200.png",
            "description": "A versatile denim jacket with a retro vibe.",
            "targetmarket": "Unisex Adults",
            "rating": 0,
            "__v": 0
        }
    ];

    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/search-results/electronics');
    });

    it('should fetch and display items based on the category search parameter', () => {
        cy.intercept('GET', 'http://localhost:5000/api/items/search-results?category=electronics', {
            statusCode: 200,
            body: sampleSearchResults,
        }).as('getItems');

        cy.wait('@getItems').its('request.url').should('include', 'category=electronics');

        cy.get('.container .row').should('have.length', 1);
        cy.get('.col-md-4').should('have.length', 2);
        cy.get('.col-md-4').first().should('contain', 'Classic T-Shirt');
        cy.get('.col-md-4').last().should('contain', 'Vintage Denim Jacket');
    });

    it('should display loading state while fetching data', () => {
        cy.intercept('GET', 'http://localhost:5000/api/items/search-results?category=electronics', {
            delayMs: 500,
            statusCode: 200,
            body: sampleSearchResults,
        }).as('getItems');

        cy.login();
        cy.visit('http://localhost:3000/search-results/electronics');
        cy.get('h3').should('contain', 'Loading...');

        cy.wait('@getItems');
        cy.get('.col-md-4').should('contain', 'Classic T-Shirt');
    });

    it('should handle API error gracefully', () => {
        cy.intercept('GET', 'http://localhost:5000/api/items/search-results?category=electronics', {
            statusCode: 500,
            body: { message: 'Internal Server Error' },
        }).as('getItems');

        cy.login();
        cy.visit('http://localhost:3000/search-results/electronics');
        cy.wait('@getItems');
        cy.get('h3.text-danger').should('contain', 'Something went wrong');
    });
});
