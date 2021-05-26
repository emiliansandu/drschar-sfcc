@PLP

Feature: PLP contains subcategory navigation

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: Rolex subcategory navigation
    Given User clicks on rolex brand
    Then Verify subcategory navigation is displayed
    And Verify subcategory navigation title is SHOP USED ROLEX WATCHES FOR SALE
    # to do: verify the plp of the selected subcategory. Pending UVBOBS-478