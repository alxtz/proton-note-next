describe("viewMode", () => {
  it("[happy] should be able to view a list of notes", () => {
    cy.visit("/")
      .get("[data-test-id=selectable-note]")
      .contains("Proton Calendar")

      .get("[data-test-id=selectable-note]")
      .contains("Design System")

      .get("[data-test-id=selectable-note]")
      .contains("ProtonMail Web Client");
  });

  it("[happy] should be able to view the title and markdown rendered text", () => {
    cy.visit("/")
      .get("[data-test-id=view-mode-title]")
      .contains("Proton Calendar")

      .get("[data-test-id=view-mode-content]")
      .contains("Basic installation");
  });

  it("[happy] write a title and plaintext markdown text and save it as a note", () => {
    cy.visit("/")
      .get("[data-test-id=edit-button]")
      .click()

      .get("[data-test-id=edit-mode-title-input]")
      .type("Edited Title With Cypress")

      .get("[data-test-id=edit-mode-md-input]")
      .type("\n# Edited Markdown With Cypress")

      .get("[data-test-id=save-button]")
      .click()

      .get("[data-test-id=view-mode-title]")
      .contains("Edited Title With Cypress")

      .get("[data-test-id=view-mode-content]")
      .contains("Edited Markdown With Cypress");
  });

  it("[happy] open an existing note and view the markdown rendered note", () => {
    cy.visit("/")
      .get("[data-test-id=selectable-note]")
      .contains("ProtonMail Web Client")
      .click()

      .get("[data-test-id=view-mode-content]")
      .contains("Official AngularJS web client");
  });

  it("[happy] click on the new note button to be taken to edit mode and create a new note", () => {
    let selectableNoteCount;

    cy.visit("/")
      .get("[data-test-id=selectable-note]")
      .its("length")
      .then(length => (selectableNoteCount = length))

      .get("[data-test-id=new-button]")
      .click()

      .get("[data-test-id=selectable-note]")
      .its("length")
      .then(length => expect(length).to.equal(selectableNoteCount + 1))

      .get("[data-test-id=selectable-note]")
      .contains("New untitled note");
  });
});
