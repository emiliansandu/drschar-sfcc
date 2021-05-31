package com.common.page.plp;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class FilterDescription extends PageObject {
    @FindBy(className = "content-filter-description")
    private WebElement filterDescription;

    @FindBy(className = "content-filter-title")
    private WebElement filterTitle;

    public FilterDescription(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(filterDescription));
        wait.until(ExpectedConditions.visibilityOf(filterTitle));
    }

    public String getH2() {
        WebElement h2 = filterDescription.findElement(By.tagName("h2"));
        return h2.getText();
    }

    public String getTitle() {
        WebElement h1 = filterTitle.findElement(By.tagName("h1"));
        return h1.getText();
    }
}
