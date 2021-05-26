package com.common.steps.homepage;

import com.common.page.homepage.StaticSearch;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;

public class StaticSearchSteps extends DriverFactory {
    private StaticSearch search = new StaticSearch(getDriver());

    @Given("User search for ([^\"]*) in static search")
    public void search(String term) {
        search.search(term);
    }
}
