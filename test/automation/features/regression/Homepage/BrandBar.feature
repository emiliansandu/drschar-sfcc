@Homepage

Feature: Homepage Brand Bar

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: Verify brand bar content
    And Verify brand bar contains the following brands
      | ROLEX       |
      | TUDOR       |
      | OMEGA       |
      | ORIS        |
      | PANERAI     |
      | CARTIER     |
      | BREITLING   |
      | ALL WATCHES |
    Given User clicks on any brand
