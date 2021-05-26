package com.common.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class SearchResults extends PageObject {
    @FindBy (xpath = "//div[contains(@class,'search-nav')]")
    private WebElement searchNav;

    @FindBy (xpath = "//div[contains(@class,'shop-watches-content')]/.//span[contains(@class,'search-result-count')]")
    private WebElement keywords;

    @FindBy (className = "search-result-count")
    private WebElement resultCount;

    public SearchResults(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(searchNav));
    }

    public String getKeywords() {
        String terms = keywords.getText();
        terms = terms.replace("Search Results for \"", "")
                .replace("\" - ", "")
                .replaceAll("\\d* items", "");

        return terms;
    }

    public int getResultCount() {
        String result = resultCount.getText();
        result = result.replace("Results for ", "");

        return Integer.parseInt(result);
    }
}
