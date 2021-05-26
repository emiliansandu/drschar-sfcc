package com.common.steps;

import com.common.page.MyAccount;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertTrue;

public class MyAccountPage extends DriverFactory {
    private MyAccount myAccount = new MyAccount(getDriver());

    @Then("Verify My Account page is displayed")
    public void myAccountIsVisible () {
        assertTrue(myAccount.isDisplayed());
    }
}
