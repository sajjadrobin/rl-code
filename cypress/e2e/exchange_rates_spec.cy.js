describe('Exchange Rates Application', () => {
  beforeEach(() => {
    // Visit your application's URL
    cy.visit('http://127.0.0.1:5500/') // Adjust this URL to match your local server
  })

  it('loads and displays the exchange rates table', () => {
    // Check if the table exists
    cy.get('table#ratesTable').should('exist')

    // Check if the table headers are correct
    cy.get('table#ratesTable th').should('have.length', 5)
    cy.get('table#ratesTable th').eq(0).should('contain', 'Unit')
    cy.get('table#ratesTable th').eq(1).should('contain', 'Code')
    cy.get('table#ratesTable th').eq(2).should('contain', 'Name')
    cy.get('table#ratesTable th').eq(3).should('contain', 'Value')
    cy.get('table#ratesTable th').eq(3).should('contain', 'Action')

    // Check if the table has rows (assuming at least one row will always be present)
    cy.get('table#ratesTable tbody tr').should('have.length.gt', 0)
  })

  it('allows editing a rate and shows an alert', () => {
    // Get the first row of the table
    cy.get('table#ratesTable tbody tr').first().within(() => {
      // Get the current value
      cy.get('input[type="number"]').invoke('val').then((currentValue) => {
        // Change the value
        const newValue = parseFloat(currentValue) + 1
        cy.get('input[type="number"]').clear().type(newValue)

        // Click the update button
        cy.get('button').click()

        // Check if an alert is shown
        cy.on('window:alert', (str) => {
          expect(str).to.contain(`updated to ${newValue}`)
        })
      })
    })
  })

  it('shows an error for invalid input', () => {
    // Get the first row of the table
    cy.get('table#ratesTable tbody tr').first().within(() => {
      // Try to set an invalid value
      cy.get('input[type="number"]').clear().type('-1')

      // Click the update button
      cy.get('button').click()

      // Check if an alert with error message is shown
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please enter a valid positive number.')
      })
    })
  })
})