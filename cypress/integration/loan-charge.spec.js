describe('Loan Charge Test', function () {
    it('create Charge', function () {
        cy.visit(Cypress.env('baseUrl') + 'createcharge')
        cy.get('#chargeAppliesTo').select('Loan')

        cy.get('#name').type(Cypress.env('installmentFeeChargeName'))
        cy.get('#currencyCode').select(Cypress.env('currency'))
        cy.get('#chargeTimeType').select('Installment Fee')
        cy.get('#chargeCalculationType').select('Flat')
        cy.get('#chargePaymentMode').select('Regular Mode')
        cy.get('#amount').type('10')
        cy.get('#active').click()

        cy.get('form').contains('button', 'Submit').click()
    })

    it('Delete Charge', function () {
        cy.visit(Cypress.env('baseUrl') + 'charges')

        cy.get('#filterCharges').type(Cypress.env('installmentFeeChargeName'))
        cy.get('tbody tr:first').click()
        cy.get('div').contains('button', 'Delete').click()
        cy.get('div').contains('button', 'Confirm').click()
    })
})