package com.common.steps.pdp;

import com.common.page.pdp.Pdp;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

public class PdpSteps extends DriverFactory {
    private Pdp pdp = new Pdp(getDriver());

    @Then("Verify user is seeing the selected PDP")
    public void verifySelectedPdp() {
        String expected = (String) pdp.stateHolder.get("productName");
        String actual = pdp.getImageText().toLowerCase();
        assertTrue("Product Name does not contain " + expected
                ,actual.contains(expected.toLowerCase()));
        assertTrue("Main image is displayed", pdp.hasImage());
        //assertTrue("Details section is empty", pdp.hasDetails());

        /* Sections not required for bob's
        assertTrue("Description is empty", pdp.hasDescription());
        assertTrue("PDP does not have reviews section", pdp.hasReviewsSection());*/
    }

    @Then("Verify user is seeing the selected PDP name matches")
    public void verifySelectedPdpName() {
        String expected = (String) pdp.stateHolder.get("productName");
        assertEquals("Product Name is not " + expected, expected.toLowerCase()
                , pdp.getName().toLowerCase());
        assertTrue("Main image is displayed", pdp.hasImage());
        assertTrue("Details section is empty", pdp.hasDetails());

        /* Sections not required for bob's
        assertTrue("Description is empty", pdp.hasDescription());
        assertTrue("PDP does not have reviews section", pdp.hasReviewsSection());*/
    }

    @Then("Verify PDP is displayed")
    public void verifyIsPdp() {
        assertTrue(pdp.isDisplayed());
    }

    @Given("User selects a size")
    public void selectSize(){
        pdp.clickSize();
    }

    @Given("User adds product to cart")
    public void addToCart() {
        pdp.clickAddToCart();
    }

    @Given("^Verify Buy Now button is (displayed|not displayed)$")
    public void verifyHasAtc(String type) {
        if (type.equals("displayed")) {
            assertTrue(pdp.hasAddToCart());
        } else {
            assertFalse(pdp.hasAddToCart());
        }
    }

    @Then("Verify PDP has certified authentic report")
    public void verifyCert () {assertTrue(pdp.hasAuthCert());}

    @Then("Verify report sample is displayed")
    public void verifyReportSampleDisplays () {assertTrue(pdp.reportIsDisplayed());}

    @Then("Verify report sample is not displayed")
    public void verifyReportSampleNotDisplays () {assertFalse(pdp.reportIsDisplayed());}

    @Given("User expands authentic report")
    public void expandAuthenticReport () {pdp.clickAuthCert();}

    @Given("User closes authentic report")
    public void closeAuthenticReport () {pdp.closeReport();}

    @Given("User clicks on Learn More")
    public void clickLearnMore () {pdp.learnMoreReport();}

    @Then("Verify product recommendations are displayed")
    public void verifyRecommendations () {
        assertTrue(pdp.isRecommendationsVisible());
        assertTrue(pdp.getRecommendationsCount() > 0);
    }

    @Given("User clicks on first recommendation")
    public void clickRecommendation() {
        pdp.clickRecommendation(0);
    }


}
