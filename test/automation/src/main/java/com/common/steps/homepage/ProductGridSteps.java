package com.common.steps.homepage;

import com.common.page.homepage.ProductGrid;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import java.util.List;

import static org.junit.Assert.assertTrue;

public class ProductGridSteps extends DriverFactory {
    private ProductGrid grid = new ProductGrid(getDriver());

    @Given("User clicks on (\\d+) item")
    public void click_item(int index) {grid.clickItem(index);}

    @Then("Verify product grid contains the following items")
    public void verify_items(List<String> items) {
        List<String> actual = grid.getItemsName();

        for(String expected : actual) {
            assertTrue("Item "+expected+" missing in product grid", actual.contains(expected));
        }
    }

    @Given("User clicks on any item")
    public void click_random_item() {grid.clickItem();}

}
