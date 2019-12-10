let firstname;
let lastname;

describe('Client Test', function () {

  before(() => {
    cy.viewport(1440, 1200)
    firstname = randomString(5)
    lastname = randomString(5)
  })

  beforeEach(() => {
    cy.wait(4000)
    cy.login()
  })

  it('Create Client', function () {
    cy.visit(Cypress.env('baseUrl') + 'createclient')
    cy.get('#firstname').type(firstname)
    cy.get('#lastname').type(lastname)
    cy.get('#activeCheckbox').click()
    cy.get('#save').click()
  })

  it('Update Client', function () {
    cy.selectClient(firstname, lastname)
    cy.get('a[href*="#/editclient"]').click()
    cy.get('#mobileNo').type(randomString(5))
    cy.get('#externalId').type('updateExternalId '+randomString(3))
    cy.get('#save').click()
  })

  it('Add Info to Datatable', function () {
    cy.selectClient(firstname, lastname)
    cy.get('#clientNotes').click()
    cy.get('#textarea').type('I have no idea what I am doing :)')
    cy.get('#saveClientNote').click()
  })

  it('Create and Disburse Loan', function () {
    cy.selectClient(firstname, lastname)
    cy.get('#generalTab').click()
    cy.get('a[href*="#/newclientloanaccount"]').click()
    cy.get('#productId').select('American_Loan_12M')

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    cy.get('#expectedDisbursementDate').type(today)
    cy.get('#submit').click()
    cy.get('#submitTerms').click()
    cy.get('#submitCharges').click()
    cy.get('#save').click()

    cy.get('#loanActions').contains('Approve').click()
    cy.get('#save').click()

    cy.get('#loanActions').contains('Disburse').click()
    cy.wait(2000)
    cy.get('#save').click()

  })

  Cypress.Commands.add('login', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.wait(3000)
    cy.get('#uid').type(Cypress.env('username'))
    cy.get('#pwd').type(Cypress.env('password'))
    cy.get('#login-button').click()
  });

  Cypress.Commands.add('selectClient', (firstName, lastName) => {
    cy.visit(Cypress.env('baseUrl') + 'clients')
    cy.get('#searchText').type(firstName + ' ' + lastName)
    cy.get('#clientSearch').click()
    cy.get('tbody tr:first').click()
  });

  Cypress.Commands.add('selectLoanAccount', (firstName, lastName) => {
    cy.selectClient(firstname, lastName)
    cy.get('tbody tr:first').click()
  });
})

function randomString(string_length) {
  let random_string = '';
  let random_ascii;
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor((Math.random() * 25) + 97);
    random_string += String.fromCharCode(random_ascii)
  }
  return random_string
}