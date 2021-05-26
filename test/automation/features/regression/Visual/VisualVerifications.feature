@Visual

Feature: Visual verifications

  Scenario: Visual verification in Homepage
    Given User goes to homepage
    Then Perform visual verification at homepage screen
    When User hovers on "Luxury-Watches" category
    Then Perform visual verification at flynav screen for desktop

  Scenario: Visual verification in Sell Page
    Given User goes to homepage
    And User clicks on rolex brand
    And User clicks on sell button on first available product
    Then Perform visual verification at sell rolex screen

  Scenario: Visual verification in Checkout pages
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

    Given User clicks on rolex brand
    And User clicks on first available product
    Then Verify user is seeing the selected PDP

    Given User adds product to cart
    Then Verify cart is displayed
    And Perform checkout visual verification at cart screen

    Given Customer starts checkout
    Then Perform checkout visual verification at billing screen

    Given Customer selects Wire as payment method
    And User fills billing data
    And User clicks Verify Checkout
    Then Verify Place Order page is displayed
    And Perform checkout visual verification at place order screen

    Given User places order
    Then Verify Thank you page is displayed
    And Perform visual verification at thank you screen