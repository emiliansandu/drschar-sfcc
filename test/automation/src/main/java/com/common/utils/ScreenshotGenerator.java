package com.common.utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.util.logging.Logger;

public class ScreenshotGenerator {
    private static Logger logger = Logger.getLogger(ScreenshotGenerator.class.toString());

    public static byte[] getScreenshot(WebDriver driver) {

        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }
}
