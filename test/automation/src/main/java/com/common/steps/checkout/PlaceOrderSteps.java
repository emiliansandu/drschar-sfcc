package com.common.steps.checkout;

import com.common.page.checkout.PlaceOrder;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertTrue;

public class PlaceOrderSteps extends DriverFactory {
    private PlaceOrder placeOrder = new PlaceOrder(getDriver());

    @Then("Verify Place Order page is displayed")
    public void place_order_is_displayed() {
        assertTrue("Place Order not displayed", placeOrder.isDisplayed());
    }

    @Given("User places order")
    public void place_order() {placeOrder.placeOrder();}
}
