package com.common.steps.plp;

import com.common.page.plp.SubcategoryNavigation;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import java.util.List;

import static org.junit.Assert.*;

public class SubcategoryNavigationSteps extends DriverFactory {
    private final SubcategoryNavigation navigation = new SubcategoryNavigation(getDriver());

    @Then("Verify category contains following categories")
    public void verify_subcategories(List<String> expectedSubcategories) {
        List<String> actual = navigation.getSubcategories();

        for (String expected : expectedSubcategories) {
            assertTrue("Missing subcategory " + expected, actual.contains(expected));
        }
    }

    @Then("Verify subcategory navigation is displayed")
    public void isDisplayed() {
        assertTrue(navigation.isDisplayed());
    }

    @Then("Verify subcategory navigation is not displayed")
    public void isNotDisplayed() {
        assertFalse(navigation.isDisplayed());
    }

    @Then("Verify subcategory navigation title is ([^\"]*)")
    public void verify_title(String expected) {
        assertEquals(expected, navigation.getTitle());
    }
}
