@PLP

Feature: PLP indexed filters

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: Indexed black rolex filter loads expected values
    Given User clicks on rolex brand
    And User applies filter Black
    Then Verify current URL contains /rolex/watches-black
    And Verify Black filter chip is visible
    And Verify filter title is "Black Rolex Watches for Sale"
    And Verify filter description title is "ABOUT BLACK ROLEX WATCHES"
    And Verify subcategory navigation is not displayed

  Scenario: Mixing indexed filters
    Given User clicks on rolex brand
    And User applies filter Black
    Then Verify Black filter chip is visible
    And User applies filter Blue
    Then Verify Blue filter chip is visible
    And Verify Clear All Filters filter chip is visible
    And Verify current URL contains /rolex/watches-black#/filter:dialColor:black|blue
    And Verify filter title is "Black Rolex Watches for Sale"
    And Verify filter description title is "ABOUT BLACK ROLEX WATCHES"
    And Verify subcategory navigation is not displayed

    Given User removes 1 chip
    Then Verify Blue filter chip is visible
    And Verify current URL contains /rolex/watches-blue
    And Verify filter title is "Used Blue Rolex Watches"
    And Verify filter description title is "ABOUT ROLEX OYSTER PERPETUAL BLUE WATCHES"
    And Verify subcategory navigation is not displayed

  Scenario: Remove all filters
    Given User clicks on rolex brand
    And User applies filter Blue
    Then Verify Blue filter chip is visible
    And User applies filter Champagne
    Then Verify Champagne filter chip is visible
    And Verify Clear All Filters filter chip is visible
    And Verify current URL contains /rolex/watches-blue#/filter:dialColor:blue|champagne
    And Verify filter title is "Used Blue Rolex Watches"
    And Verify filter description title is "ABOUT ROLEX OYSTER PERPETUAL BLUE WATCHES"
    And Verify subcategory navigation is not displayed

    Given User removes 0 chip
    Then Verify "ROLEX WATCHES" PLP is displayed
    And Verify subcategory navigation is displayed