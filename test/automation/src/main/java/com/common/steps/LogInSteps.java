package com.common.steps;

import com.common.page.LogIn;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;

public class LogInSteps extends DriverFactory {
   private LogIn logIn = new LogIn(getDriver());

    @Given("Customer successfully logs in")
    public void logIn() {
        logIn.logIn();
    }

}
