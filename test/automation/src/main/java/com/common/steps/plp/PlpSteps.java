package com.common.steps.plp;

import com.common.page.plp.Plp;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PlpSteps extends DriverFactory {
    private Plp plp = new Plp(getDriver());

    @Then("^Verify \"([^\"]*)\" PLP is displayed")
    public void verifyCategoryTitle(String expected) {
        assertEquals(expected,plp.getTitle());
        assertTrue(plp.getProductsLength() > 0);
    }

    @Then("^Verify the PLP from selected grid item is displayed")
    public void verifyCategoryTitle() {
        String expected = (String) plp.stateHolder.get("product-grid-name");
        assertTrue(plp.getTitle().toLowerCase().contains(expected.toLowerCase()));
        assertTrue(plp.getProductsLength() > 0);
    }

    @Then("^Verify the PLP from selected grid matches quantity items$")
    public void verifyCategoryCount() {
        int expected = (Integer) plp.stateHolder.get("product-grid-count");

        assertEquals(expected, +plp.getProductsCount());
        assertTrue(plp.getProductsLength() > 0);
    }

    @Given("User opens a PDP from current PLP")
    public void openPdpFromPlp() {
        plp.openProduct(0);
    }

    @Given("User clicks on first available product")
    public void clickFirstAvailableProduct() {
        plp.openAvailableProduct(0);
    }

    @Given("User clicks on first product on wait list")
    public void clickFirstWaitListProduct() {
        plp.openWaitlistProduct(0);
    }

    @Then("Verify current URL contains ([^\"]*)")
    public void verifyCurrentURL(String url) {
        String current = plp.getCurrentURL();
        assertTrue("Current url: " + current, current.contains(url));
    }

    @Given("User clicks on sell button on first available product")
    public void sellWatch() {
        plp.sellButton(0);
    }
}
