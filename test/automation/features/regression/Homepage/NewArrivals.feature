@Homepage

Feature: Homepage New Arrivals

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: New Arrivals content
    And Verify New Arrivals contains 6 products

    Given User clicks on any new arrivals item
    Then Verify PDP is displayed

    #Unable to verify the PLP tile -- UVBOBS-478
  #Scenario: New Arrivals CTA
    #Given User clicks on View All in new arrivals
    #Then Verify "new arrivals" PLP is displayed

