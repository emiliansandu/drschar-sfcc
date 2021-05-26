@PDP

  Feature: PDP content

    Background:
      Given User goes to homepage
      And User closes tracking modal
      Then Verify logo is visible

    Scenario: Navigate to PDP from product grid
      Given User clicks on 0 item
      And User clicks on first available product
      Then Verify user is seeing the selected PDP
      And Verify PDP has certified authentic report
      And Verify report sample is not displayed

      Given User expands authentic report
      Then Verify report sample is displayed

      Given User closes authentic report
      Then Verify report sample is not displayed

    Scenario: Navigate to PDP from new arrivals
      Given User clicks on 0 item
      And User clicks on first available product
      Then Verify user is seeing the selected PDP
      And Verify PDP has certified authentic report
      And Verify report sample is not displayed

      Given User expands authentic report
      Then Verify report sample is displayed

      Given User clicks on Learn More
      Then Verify page h1 is "Certified Authentic Report"
