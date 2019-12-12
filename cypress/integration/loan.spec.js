describe('Loan Test', function () {
  it('Create Client', function () {
    cy.visit(Cypress.env('baseUrl') + 'createclient')

    cy.getClientFirstAndLastName().then(names => {
      cy.get('#firstname').type(names[0])
      cy.get('#lastname').type(names[1])
    })
    
    cy.get('#activeCheckbox').click()
    cy.get('#save').click()
  })

  it('Create Loan', function () {
    cy.getClientFirstAndLastName().then(names => {
      cy.selectClient(names[0], names[1])

      cy.get('#generalTab').click()
      cy.get('a[href*="#/newclientloanaccount"]').click()
      cy.get('#productId').select(Cypress.env('loanproduct'))

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      cy.get('#expectedDisbursementDate').type(today)
      cy.get('#submit').click()
      cy.get('#submitTerms').click()
      cy.get('#submitCharges').click()
      cy.get('#save').click()
    })
  })

  it('Approve Loan', function () {
    cy.getClientFirstAndLastName().then(names => {
      cy.selectClient(names[0], names[1])

      cy.get('#generalTab').click()

      cy.get('table').contains('td', Cypress.env('loanproduct')).click();
      cy.get('#loanActions').contains('Approve').click();
      cy.wait(1000)
      cy.get('#save').click()
    })
  })

  it('Disburse Loan', function () {
    cy.getClientFirstAndLastName().then(names => {
      cy.selectClient(names[0], names[1])

      cy.get('#generalTab').click()

      cy.get('table').contains('td', Cypress.env('loanproduct')).click();
      cy.get('#loanActions').contains('Disburse').click();
      cy.wait(1000)
      cy.get('#save').click()
    })
  })
})