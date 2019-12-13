describe('Loan Product Test', function() {
    it('create Product', function() {
        cy.visit(Cypress.env('baseUrl') + 'createloanproduct')
        cy.get('#name').type('Demo_Product')
        cy.get('#shortName').type('DP')

        cy.get('fieldset').contains('button', 'Next').click()
        cy.get('#installmentAmountInMultiplesOf').type('1')

        cy.get('#submitCurrency').click()
        cy.get('#minPrincipal').type('1000')
        cy.get('#principal').type('5000')
        cy.get('#maxPrincipal').type('50000')
        cy.get('#minNumberOfRepayments').type('1')
        cy.get('#numberOfRepayments').type('12')
        cy.get('#maxNumberOfRepayments').type('12')
        cy.get('#minInterestRatePerPeriod').type('5')
        cy.get('#interestRatePerPeriod').type('5')
        cy.get('#maxInterestRatePerPeriod').type('10')
        cy.get('#repaymentEvery').type('1')
        cy.get('#minimumDaysBetweenDisbursalAndFirstRepayment').type('1')

        cy.get('#submitTerms').click()
        cy.get('#submitSettings').click()
        cy.get('#submitCharges').click()
        cy.get('#submitAccounting').click()
        cy.get('form').contains('button', 'Create Loan Product').click()
    })
})