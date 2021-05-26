package com.common.steps.checkout;

import com.common.page.checkout.ThankYou;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertTrue;

public class ThankYouSteps extends DriverFactory {
    private ThankYou thankYou = new ThankYou(getDriver());

    @Then("Verify Thank you page is displayed")
    public void is_displayed() {
        assertTrue(thankYou.isDisplayed());
    }
}
