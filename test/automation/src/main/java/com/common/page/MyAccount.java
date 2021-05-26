package com.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class MyAccount extends PageObject {
    public MyAccount(WebDriver driver) {
        super(driver);
    }

    private String mainDivXpath = "//div[@data-action='Account-Show']";

    public boolean isDisplayed() {
        WebElement mainDiv = driver.findElement(By.xpath(mainDivXpath));
        return mainDiv.isDisplayed();
    }
}
