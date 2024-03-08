describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      name: "Sonu Only",
      username: "Sonu",
      password: "Sonu"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173/')
  })
   it('contains Log in to application', () => {
    cy.contains('Log in to application')
  })
  it('login to application', () => {
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.contains('login').click()
  })

  describe('when logged in ', () => {
    beforeEach(() => {
      cy.get('#username').type('Sonu')
      cy.get('#password').type('Sonu')
      cy.contains('login').click()
    })
    it('note created by cypress', () => {
      cy.contains('new blog').click()
      cy.get('#title').type('created note by cypress')
      cy.get('#author').type('S Krishna')
      cy.get('#url').type('https://www.cypress.io/')
      cy.get('#likes').type('40')
      cy.contains('create').click()
      cy.contains('created note by cypress')
    })
  })
})


// npm run cypress:open
// npm run start:test