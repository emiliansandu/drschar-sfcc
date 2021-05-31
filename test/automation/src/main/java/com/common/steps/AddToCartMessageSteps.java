package com.common.steps;

import com.common.page.AddToCartMessage;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertTrue;

public class AddToCartMessageSteps extends DriverFactory {
    private AddToCartMessage atcm = new AddToCartMessage(getDriver());

    @Then("Verify Product Added To Cart message is displayed")
    public void atcmIsDisplayed() {
        assertTrue(atcm.addToCartMessageIsDisplayed());
    }
}
