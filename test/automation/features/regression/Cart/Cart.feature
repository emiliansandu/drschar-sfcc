@Cart

  Feature: Cart functionality

    Background:
      Given User goes to homepage
      And User closes tracking modal
      Then Verify logo is visible

    Scenario: Update quantity to get error
      Given User clicks on panerai brand
      And User clicks on first available product
      Then Verify user is seeing the selected PDP

      Given User adds product to cart
      Then Verify cart is displayed
      And Verify product added from PDP is in cart

      Given User edit qty to 2 in first product
      And User clicks update in first item
      Then Verify error message displays YOUR QUANTITY HAS BEEN ADJUSTED DUE TO THE LACK OF QUANTITY IN OUR STORE

    Scenario: Remove item shows empty cart
      Given User clicks on oris brand
      And User clicks on first available product
      Then Verify user is seeing the selected PDP

      Given User adds product to cart
      Then Verify cart is displayed

      Given User removes first item
      Then Verify cart is empty



