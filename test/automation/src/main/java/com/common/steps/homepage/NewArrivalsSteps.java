package com.common.steps.homepage;

import com.common.page.homepage.NewArrivals;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;

public class NewArrivalsSteps extends DriverFactory {
    private NewArrivals grid = new NewArrivals(getDriver());

    @Given("User clicks on (\\d+) new arrivals item")
    public void click_item(int index) {grid.clickItem(index);}

    @Given("User clicks on View All in new arrivals")
    public void view_all() {grid.clickViewAll();}

    @Given("User clicks on any new arrivals item")
    public void click_any_item() {grid.clickItem(); }

    @Then("Verify New Arrivals contains 6 products")
    public void verify_new_arrivals() {
        assertEquals(6,grid.getItemsCount());
    }
}
