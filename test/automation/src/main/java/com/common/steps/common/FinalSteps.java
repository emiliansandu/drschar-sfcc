package com.common.steps.common;

import com.common.utils.DriverFactory;
import com.common.utils.ScreenshotGenerator;
import com.common.utils.Util;
import io.cucumber.core.api.Scenario;
import io.cucumber.java.After;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;

import java.util.logging.Logger;

public class FinalSteps {
    private final Logger logger = Logger.getLogger(FinalSteps.class.toString());
    private DriverFactory driverFactory = new DriverFactory();
    private WebDriver driver = driverFactory.getDriver();

    @After
    public void quitDriver(Scenario scenario) {
        String data;

        if (scenario.isFailed()) {
            logger.info("Taking screenshot of scenario "+ scenario.getName());

            try {

                final byte[] screenshot = ScreenshotGenerator.getScreenshot(driver);
                scenario.embed(screenshot, "image/png");

            } catch (WebDriverException e) {
                logger.severe("An exception happened when taking step screenshot after scenario: \n" + e.getMessage());
            }

            data = Util.logBrowserErrors(driver);
            scenario.embed(data.getBytes(), "text/plain");

            Dimension size = driver.manage().window().getSize();
            String dimension = "Driver size: " + size.width + "," + size.height;
            scenario.embed(dimension.getBytes(), "text/plain");
        }

        driverFactory.destroyDriver();
    }
}
