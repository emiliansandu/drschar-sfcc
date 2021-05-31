@customerCheckout

  Feature: User can checkout as customer

    Background:
      Given User goes to homepage
      And User closes tracking modal
      Then Verify logo is visible

    Scenario: Place an Order with Credit Card as customer
      Given User clicks on "top-seller" category
      And User opens a PDP from current PLP
      Then Verify user is seeing the selected PDP

      Given User adds product to cart
      And User clicks on cart icon
      Then Verify cart is displayed
      And Verify product added from PDP is in cart

      Given Customer starts checkout
      Then Verify Checkout-Login is displayed
      And Customer successfully logs in
      Then Verify Checkout-Billing is displayed

      Given User clicks Next Payment
      Then Verify Checkout-Payment is displayed
      And User select CC as payment method

      Given User fills email data
      Then User fills Payment cvv field
      And User clicks Next Place Order
      Then Verify Placer Order page is displayed
      And User clicks Place Order
      Then Verify Thank you page is displayed
