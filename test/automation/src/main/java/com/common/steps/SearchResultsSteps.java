package com.common.steps;

import com.common.page.SearchResults;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;

public class SearchResultsSteps extends DriverFactory {
    private SearchResults results = new SearchResults(getDriver());

    @Then("Verify search term is ([^\"]*)")
    public void verify_search_term(String expected) {
        assertEquals(expected.toLowerCase(), results.getKeywords().toLowerCase());
    }
}
