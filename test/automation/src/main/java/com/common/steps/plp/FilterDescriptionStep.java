package com.common.steps.plp;

import com.common.page.plp.FilterDescription;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;

public class FilterDescriptionStep extends DriverFactory {
    private FilterDescription description = new FilterDescription(getDriver());

    @Then("Verify filter description title is \"([^\"]*)\"")
    public void verifyFilterDescription(String expected) {
        assertEquals(expected, description.getH2());
    }

    @Then("^Verify filter title is \"([^\"]*)\"")
    public void verifyCategoryTitle(String expected) {
        assertEquals(expected, description.getTitle());
    }
}
