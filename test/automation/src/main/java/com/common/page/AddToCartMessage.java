package com.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class AddToCartMessage extends PageObject{

    public AddToCartMessage(WebDriver driver) {
        super(driver);
    }

    private String addToCartMessageXpath = "//div[@class='add-to-cart-messages']";

    public boolean addToCartMessageIsDisplayed() {
        boolean isDisplayed = false;

        List<WebElement> message = driver.findElements(By.xpath(addToCartMessageXpath));
        if (message.size() > 0) {
            isDisplayed = message.get(0).isDisplayed();
        }

        return isDisplayed;
    }

}