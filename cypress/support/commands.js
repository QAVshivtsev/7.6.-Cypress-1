 Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log in").click();
   if (email) 
    cy.get("#mail").type(email);
   if (password) 
    cy.get("#pass").type(password);
   cy.contains("Submit").click();
 });

 Cypress.Commands.add("createNewBook", (title, author) => {
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  cy.get("#authors").type(author);
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBookToFavorite", (title, authors) => {
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  cy.get("#authors").type(authors);
  cy.get("#favorite").click();
  cy.contains("Submit").click();
});
