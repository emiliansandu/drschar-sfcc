package com.common.steps.checkout;

import com.common.page.checkout.Checkout;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertTrue;

public class CheckoutSteps extends DriverFactory {
    private Checkout checkout = new Checkout(getDriver());
    private Checkout checkoutMain = new Checkout(getDriver());

    @Then("Verify Checkout-Login is displayed")
    public void isCLDisplayed() {assertTrue("Checkout-Login not displayed", checkout.isDisplayed());}

    @Then("Verify Checkout-Billing is displayed")
    public void isCHDisplayed() {assertTrue("Checkout-Billing not displayed", checkout.isDisplayed());}

    @Then("Verify Checkout-Payment is displayed")
    public void isNPDisplayed() {assertTrue("Checkout-Payment not displayed", checkout.isDisplayed());}

    @And("User select CC as payment method")
    public void CC_Checkout() {checkout.clickCC();}

    @Then("Verify Paypal payment is displayed")
    public void isPayPDisplayed() {assertTrue("Checkout-Paypal not displayed", checkout.paypalisDisplayed());}

    @Then("Verify Paypal login is displayed")
    public void isPayLoginDisplayed() {assertTrue("Paypal Login not displayed", checkout.payloginisDisplayed());}

    @Then("Verify Placer Order page is displayed")
    public void isPODisplayed() {assertTrue("Checkout-PlaceOrder not displayed", checkout.isDisplayed());}

    @Given("User clicks Verify Checkout")
    public void verify_checkout() {checkout.clickVerifyCheckout();}

    @And("User clicks Checkout as Guest")
    public void checkout_guest() {checkout.clickCheckoutGuest();}

    @And("User clicks Next Payment")
    public void next_payment() {checkout.clickNextPayment();}

    @And("User clicks on paypal checkout")
    public void paypal_checkout() {checkout.clickPaypalCheckout();}

    @And("User clicks Next Place Order")
    public void next_order() {checkout.clickNextPlaceOrder();}

    @And("User clicks Place Order")
    public void place_order() {checkout.clickPlaceOrder();}

    @Given("User selects Paypal as payment method")
    public void paypal_payment() {checkout.clickPaypalPayment();}

}
