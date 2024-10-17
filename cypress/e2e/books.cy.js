describe("login process", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("logins successfully with correct credentials", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible", true);
  });

  it("shows ERROR when login is not entered", () => {
  
     cy.login(null , "123");
    cy.get("#mail")
      .then((el) => el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((el) => el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("shows ERROR when password is not entered", () => {
    cy.login("bropet@mail.ru", null);
    cy.get("#pass")
      .then((el) => el[0].checkValidity())
      .should("be.false");
    cy.get("#pass")
      .then((el) => el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });
});

import { faker } from "@faker-js/faker";
let bookData;

beforeEach(() => {
  cy.visit("/");
  bookData = {
    title: faker.company.catchPhraseAdjective(),
    author: faker.name.fullName(),
  };
});

describe("Favorite books testing", () => {
  it('Create book"', () => {
    cy.login("bropet@mail.ru", "123");
    cy.createNewBook(bookData.title, bookData.author);
    cy.get(".card-title").should("contain", bookData.title);
  });

  it("Add book to favorite through creating book", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBookToFavorite(bookData.title, bookData.author);
    cy.contains(bookData.title).should("be.visible");
    cy.visit("/favorites");
    cy.contains(bookData.title).should("be.visible");
  });

  it("Add book to favorite through pressing a button", () => {
    cy.login("bropet@mail.ru", "123");
    cy.createNewBook(bookData.title, bookData.author);
    cy.contains(bookData.title)
      .should("be.visible")
      .within(() => cy.contains("Add to favorite").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookData.title).should("be.visible");
  });

  it("Delete book from favorite", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBookToFavorite(bookData.title, bookData.author);
    cy.visit("/favorites");
    cy.contains(bookData.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookData.title).should("not.exist");
  });
});





