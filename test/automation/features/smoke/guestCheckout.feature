@Checkout

  Feature: User can start checkout as guest

    Background:
      Given User goes to homepage
      And User closes tracking modal
      Then Verify logo is visible

    Scenario: Place an Order with Credit Card as guest
      Given User clicks on "Products" category
      And User closes cookie
      And User opens a PDP from current PLP
      Then Verify user is seeing the selected PDP

      Given User closes cookie
      And User selects a quantity
      #And User selects a size

      Given User adds product to cart
      And User clicks on cart icon
      And User closes cookie
      Then Verify cart is displayed
      And Verify product added from PDP is in cart

      Given Customer starts checkout
      And User closes cookie
      Then Verify Checkout-Login is displayed
      And User clicks Checkout as Guest
      Then Verify Checkout-Billing is displayed
      And User closes cookie

      Given User fills billing data
      And User clicks Next Payment
      Then Verify Checkout-Payment is displayed
      #And User select CC as payment method

      Given User fills payment data
      And User clicks Next Place Order
      Then Verify Placer Order page is displayed
      And User clicks Place Order
      Then Verify Thank you page is displayed
