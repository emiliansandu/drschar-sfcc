package com.common.page.homepage;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class StaticSearch extends PageObject {
    @FindBy (className = "static-search")
    private WebElement search;

    public StaticSearch(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(search));
    }

    public void search(String searchTerm) {
        WebElement input = search.findElement(By.name("q"));
        input.sendKeys(searchTerm);
        WebElement button = search.findElement(By.className("static-search-submit"));
        button.click();
    }
}
