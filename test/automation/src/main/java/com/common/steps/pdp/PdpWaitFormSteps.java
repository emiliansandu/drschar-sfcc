package com.common.steps.pdp;

import com.common.page.pdp.PdpWaitForm;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertTrue;

public class PdpWaitFormSteps extends DriverFactory {
    PdpWaitForm form = new PdpWaitForm(getDriver());

    @Then("Verify wait form is displayed")
    public void verifyWaitForm () {
        assertTrue(form.isVisible());
    }

    @Given("User submits wait form")
    public void submitWaitForm () {
        form.submitForm();
    }

    @Then("Verify success modal is displayed")
    public void successModal () {
        assertTrue(form.isSuccessModalDisplayed());
    }

}
