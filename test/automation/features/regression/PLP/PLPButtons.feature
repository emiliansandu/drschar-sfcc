@PLP

Feature: PLP shows buy and wait list button

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: Wait list button does not display BUY NOW
    Given User clicks on cartier brand
    And User clicks on first product on wait list
    Then Verify user is seeing the selected PDP
    And Verify Buy Now button is not displayed

  Scenario: User is able to submit wait form
    Given User clicks on cartier brand
    And User clicks on first product on wait list
    Then Verify user is seeing the selected PDP
    And Verify Buy Now button is not displayed
    And Verify wait form is displayed

    Given User submits wait form
    Then Verify success modal is displayed

  Scenario: BUY button displays BUY NOW
    Given User clicks on cartier brand
    And User clicks on first available product
    Then Verify user is seeing the selected PDP
    And Verify Buy Now button is displayed