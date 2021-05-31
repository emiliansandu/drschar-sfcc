@PDP

  Feature: PDP Recommendations

    Background:
      Given User goes to homepage
      And User closes tracking modal
      Then Verify logo is visible

    Scenario: Navigate to PDP from brand bar
      Given User clicks on rolex brand
      And User clicks on first available product
      Then Verify user is seeing the selected PDP
      And Verify product recommendations are displayed

      Given User clicks on first recommendation
      Then Verify user is seeing the selected PDP name matches
