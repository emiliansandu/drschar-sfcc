@Checkout

Feature: Amazon Checkout

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: Customer can checkout with Amazon Pay
    Given User clicks on tudor brand
    And User clicks on first available product
    Then Verify user is seeing the selected PDP

    Given User adds product to cart
    Then Verify cart is displayed
    And Verify product added from PDP is in cart

    Given Customer starts checkout
    And Customer selects AMAZON as payment method
    And Customer signs in to Amazon Pay
    And Customer clicks on Continue Checkout
    Then Verify Place Order page is displayed

    Given User places order
    Then Verify Thank you page is displayed