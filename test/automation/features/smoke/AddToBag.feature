@AddToCart

  Feature: User can add product to cart

    Background:
      Given User goes to homepage
      And User closes tracking modal
      Then Verify logo is visible


    Scenario Outline: Add to cart from PDP - navigate from category
      Given User clicks on "products" category
      And User closes cookie
      And User opens a PDP from current PLP
      Then Verify user is seeing the selected PDP
      And User closes cookie

      Given User adds product to cart
      And User clicks on cart icon
      Then Verify cart is displayed
      And Verify product added from PDP is in cart
      Examples:
        | category |
        | Products |
