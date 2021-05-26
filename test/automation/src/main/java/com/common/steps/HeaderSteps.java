package com.common.steps;

import com.common.page.Header;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class HeaderSteps extends DriverFactory {
    private Header header= new Header(getDriver());

    @Then("Verify logo is visible")
    public void verify_logo_visible() {
        assertTrue(header.isLogoVisible());
    }

    @Given("^User hovers on \"([^\"]*)\" category$")
    public void userHoversCategory(String category)  {
        header.hoverCategory(category);
    }

    @Given("^User clicks on \"([^\"]*)\" category$")
    public void userClicksCategory(String category)  {
        header.clickCategory(category);
    }


    @Then("^Verify \"([^\"]*)\" Fly Nav is visible$")
    public void flyNavIsVisible(String category){
        assertTrue(header.flyNavIsDisplayed(category));
    }

    @Given("User closes tracking modal")
    public void closeTrackingModal() {
        header.closeModal();
    }

    @Given("^User clicks \"([^\"]*)\" category in fly nav$")
    public void clickCategoryInFlyNav(String category) {
        header.clickFlyNavCategory(category);
    }

    @Given("User search for \"([^\"]*)\"")
    public void searchFor(String term) {
        header.search(term);
    }

    @Given("^User goes to cart$")
    public void userGoesToCart() {
        header.clickMiniCart();
    }

    @Then("^Cart has (\\d+) items$")
    public void cartHasExpectedItems(int expected) {
        assertEquals(expected, header.getNoItems());
    }

    @Given("User clicks on Log In from Header")
    public void clickLogIn() {
        header.clickLogIn();
    }

    @Given("User clicks on cart icon")
    public void clickCart() {
        header.clickCart();
    }
}
