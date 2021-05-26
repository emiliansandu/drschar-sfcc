package com.common.page.plp;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

public class SubcategoryNavigation extends PageObject {

    private boolean isDisplayed = false;
    private WebElement navTitle = null;
    private List<WebElement> subcategories = null;

    public SubcategoryNavigation(WebDriver driver) {
        super(driver);
        List<WebElement> navTitleList = driver.findElements(
                By.xpath("//div[@class='navigation-header']"));
        List<WebElement> navBlockList = driver.findElements(
                By.xpath("//div[@class='subcategoryHead']"));

        if (navTitleList.size() > 0 && navBlockList.size() > 0) {
            navTitle = navTitleList.get(0);
            WebElement navBlock = navBlockList.get(0);
            subcategories = navBlock.findElements(By.tagName("a"));
            isDisplayed = navTitle.isDisplayed();
        }
    }

    public List<String> getSubcategories() {
        List<String> names = new ArrayList<String>();

        if (isDisplayed) {
            for (WebElement subcategory : subcategories) {
                names.add(subcategory.getAttribute("textContent").toLowerCase().trim());
            }
        }

        return names;
    }

    public boolean isDisplayed() {
        isDisplayed = navTitle.isDisplayed();
        return isDisplayed;
    }

    public String getTitle() {
        String title = "";

        if (isDisplayed) {
            title = navTitle.getText();
        }

        return title;
    }
}
