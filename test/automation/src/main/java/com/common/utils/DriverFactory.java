package com.common.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

public class DriverFactory {
    private static final Map<String, WebDriver> driverMap = new HashMap();
    private final Logger logger = Logger.getLogger(DriverFactory.class.toString());

    public WebDriver getDriver() {
        String identifier = Thread.currentThread().getName();
        WebDriver driver = driverMap.get(identifier);

        if (driver == null) {
            driver = createNewDriverInstance();
            driverMap.put(identifier, driver);
        }

        return driver;
    }

    private WebDriver createNewDriverInstance() {
        ChromeOptions capabilities = new ChromeOptions();
        capabilities.addArguments("--window-size=1204,1080");
        capabilities.addArguments("--no-sandbox");

        if(Util.isHeadless()) {
            capabilities.addArguments("--headless");
        }

        final WebDriver driver = new ChromeDriver(capabilities);
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

        return driver;
    }

    public void destroyDriver() {
        String identifier = Thread.currentThread().getName();
        WebDriver driver = driverMap.get(identifier);

        driverMap.remove(identifier);
        try {
            driver.quit();
        } catch (WebDriverException wde) {
            logger.severe("Error trying to kill the browser, assuming is already dead.");
        }
    }
}
