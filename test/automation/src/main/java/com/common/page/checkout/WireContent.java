package com.common.page.checkout;

import com.common.page.PageObject;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class WireContent extends PageObject {
    @FindBy(id = "wire-content")
    private WebElement tabPane;

    public WireContent(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(tabPane));
    }

    public boolean isDisplayed() {
        return tabPane.isDisplayed();
    }

}
