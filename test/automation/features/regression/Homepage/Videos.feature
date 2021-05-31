@Homepage

Feature: Homepage Videos

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: Verify first video display
    Given User clicks play on first video
    Then Verify first video displays youtube video

  Scenario: Verify second video display
    Given User clicks play on second video
    Then Verify second video displays youtube video