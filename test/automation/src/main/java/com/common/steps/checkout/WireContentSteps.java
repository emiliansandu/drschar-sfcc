package com.common.steps.checkout;

import com.common.page.checkout.WireContent;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertTrue;

public class WireContentSteps extends DriverFactory {
    private WireContent wireContent = new WireContent(getDriver());

    @Then("^Verify Wire tab is displayed")
    public void isDisplayed () {assertTrue(wireContent.isDisplayed());}
}
