/// <reference types="Cypress" />

describe("Navigate throughout website", () => {
  it("should have side and top navigation", () => {
    cy.viewport(1200, 1000);
    cy.visit("localhost:5173/");

    cy.get("a[href='/topic/917537692615573506']").should("be.visible");
    cy.wait(3000);

    cy.get("a[href='/topic/917537692615573506']").trigger("mouseover").click();
    cy.url().should('contain', 'topic')
    cy.title().should('eq', "IronCodeMan | Print Text")
    cy.wait(3000);

    cy.get("img[alt='app-icon']").should("be.visible");
    cy.get("img[alt='app-icon']").trigger("mouseover").click();
    cy.url().should('not.contain', 'topic')
    cy.title().should('eq', "IronCodeMan | Home")
    cy.wait(3000);
  })


});