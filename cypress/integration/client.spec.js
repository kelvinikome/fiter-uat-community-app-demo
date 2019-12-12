describe('Client Test', function () {
  it('Create Client', function () {
    cy.visit(Cypress.env('baseUrl') + 'createclient')

    cy.getClientFirstAndLastName().then(names => {
      cy.get('#firstname').type(names[0])
      cy.get('#lastname').type(names[1])
    })
    
    cy.get('#activeCheckbox').click()
    cy.get('#save').click()
  })

  it('Update Client', function () {
    cy.getClientFirstAndLastName().then(names => {
      cy.selectClient(names[0], names[1])
    
      cy.get('a[href*="#/editclient"]').click()
      cy.randomString().then(mobileNo => {
        cy.get('#mobileNo').type(mobileNo)
        cy.randomString().then(externalId => cy.get('#externalId').type('updateExternalId '+externalId))
      })
      cy.get('#save').click()
    })
  })

  it('Add Info to Datatable', function () {
    cy.getClientFirstAndLastName().then(names => {
      cy.selectClient(names[0], names[1])
      
      cy.get('#clientNotes').click()
      cy.get('#textarea').type('I have no idea what I am doing :)')
      cy.get('#saveClientNote').click()
    })
  })
})