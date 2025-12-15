import { faker } from "@faker-js/faker";

describe("Test du formulaire", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Scénario 1 : champs visibles et utilisables", () => {
    cy.get("#lastName").should("be.visible").and("not.be.disabled");
    cy.get("#firstName").should("be.visible").and("not.be.disabled");
    cy.get("#email").should("be.visible").and("not.be.disabled");
    cy.get("#age").should("be.visible").and("not.be.disabled");

    cy.get('input[name="recommend"]').should("have.length", 3);
    cy.get('input[name="skill"]').should("have.length.at.least", 1);

    cy.get('select[name="level"]').should("be.visible");
    cy.get("#suggestions").should("be.visible");

    cy.get('button[type="submit"]').should("be.visible");
    cy.get('button[type="reset"]').should("be.visible");
  });

  it("Scénario 2 : message si formulaire vide", () => {
    cy.get('button[type="submit"]').click();
    cy.get("#notification").should("have.class", "show");
  });

  it("Scénario 3 : formulaire valide", () => {
    cy.get("#lastName").type(faker.person.lastName());
    cy.get("#firstName").type(faker.person.firstName());
    cy.get("#email").type(faker.internet.email());
    cy.get("#age").type("30");

    cy.get('select[name="level"]').select("medium");
    cy.get('button[type="submit"]').click();

    cy.get("#notification").should("not.have.class", "show");
  });
});
