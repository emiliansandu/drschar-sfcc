package com.common.steps;

import com.common.page.PageObject;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;

public class PageObjectSteps extends DriverFactory {
    private PageObject pageObject = new PageObject(getDriver());

    @Then("Verify page h1 is \"([^\"]*)\"")
    public void verify_h1(String expected) {
        assertEquals(expected, pageObject.getH1());
    }
}
