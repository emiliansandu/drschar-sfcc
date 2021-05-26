package com.common.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogEntry;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.Logs;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.logging.Logger;

public class Util {
    public static final int DEFAULT_TIMEOUT = 60;
    protected static final Logger logger = Logger.getLogger(Util.class.toString());


    public static WebDriverWait createWebDriverWait(WebDriver driver) {
        return new WebDriverWait(driver, DEFAULT_TIMEOUT);
    }

    public static String getEnvironment() {
        return System.getProperty("environment", "ci");
    }

    public static boolean isHeadless() {
        return Boolean.getBoolean("headless");
    }

    public static String logBrowserErrors(WebDriver driver) {
        Logs errorlog = driver.manage().logs();
        LogEntries errors = errorlog.get(LogType.BROWSER);
        String errorMessage = "";

        for (LogEntry error : errors) {
            errorMessage += error.getMessage() + "\n";
        }

        if (!errorMessage.isEmpty()) {
            errorMessage = "Browser log: \n" + errorMessage;
            if (Boolean.getBoolean("errorLog")) {
                logger.severe(errorMessage);
            }
        }

        return errorMessage;
    }

    public static String replaceXpath(String xpath, String replace) {
        return xpath.replace("{}", replace);
    }
}
