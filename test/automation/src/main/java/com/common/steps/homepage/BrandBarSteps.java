package com.common.steps.homepage;

import com.common.page.homepage.BrandBar;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import java.util.List;

import static org.junit.Assert.assertTrue;

public class BrandBarSteps extends DriverFactory {
    private BrandBar brandBar = new BrandBar(getDriver());

    @Given("User clicks on ([^\"]*) brand")
    public void click_brand(String brand) {
        if (brand.equals("any")) {
            brandBar.clickBrand();
        } else {
            brandBar.clickBrand(brand);
        }
    }

    @Then("Verify brand bar contains the following brands")
    public void verify_brands(List<String> expectedBrands) {
        List<String> actual = brandBar.getBrands();

        for(String expected : expectedBrands) {
            assertTrue("Brand "+expected+" missing in brand bar", actual.contains(expected));
        }
    }

}
