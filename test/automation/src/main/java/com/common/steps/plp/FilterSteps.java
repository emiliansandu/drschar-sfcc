package com.common.steps.plp;

import com.common.page.plp.Filter;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import java.util.List;

import static org.junit.Assert.assertTrue;

public class FilterSteps extends DriverFactory {
    private Filter filter = new Filter(getDriver());

    @Given("User applies filter ([^\"]*)")
    public void applyFilter(String value) {
        filter.selectRefinement(value);
    }

    @Then("Verify ([^\"]*) filter chip is visible")
    public void verifyFilterChip(String value) {
        List<String> chips = filter.getFilterChips();
        assertTrue(chips.contains(value));
    }

    @Given("User removes (\\d+) chip")
    public void removeFilter(int i) {
        filter.removeFilter(i);
    }
}
