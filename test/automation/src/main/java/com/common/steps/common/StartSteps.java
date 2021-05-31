package com.common.steps.common;

import com.common.utils.DriverFactory;
import com.common.utils.PropertyReader;
import io.cucumber.core.api.Scenario;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;

public class StartSteps {
    private final PropertyReader reader = PropertyReader.getPropertyReader();
    private WebDriver driver;

    @Before
    public void setupDriver(Scenario s) {
        System.out.println("Executing: " + s.getName());
        DriverFactory driverFactory = new DriverFactory();
        driver = driverFactory.getDriver();
    }

    @Given("User goes to homepage")
    public void user_is_on_home_page() {
        driver.get(reader.getProperty("url"));
    }


}
