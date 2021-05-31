@MyAccount
Feature: User can log in
    Background:
        Given User goes to homepage
        And User closes tracking modal
        Then Verify logo is visible
    Scenario: Log In
        Given User clicks on Log In from Header
        And Customer successfully logs in
        Then Verify My Account page is displayed
