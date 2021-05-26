package com.common.page.homepage;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

public class NewArrivals extends PageObject {
    @FindBy(id = "newArrivalsGrid")
    private WebElement grid;

    private final List<WebElement> items;
    private final WebElement viewAll;

    public NewArrivals(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(grid));
        items = grid.findElements(By.className("new-arrivals-item"));
        viewAll = grid.findElement(By.className("new-arrvals-button"));
    }

    public void clickItem() {
        int random = (int) (Math.random() * items.size());
        clickItem(random);
    }

    public void clickItem(int index) {
        WebElement item = items.get(index);

        String itemName = item.findElement(By.className("new-arrivals-name")).getText();
        stateHolder.put("productName", itemName);

        WebElement span = item.findElement(By.tagName("span"));
        span.click();
    }

    public int getItemsCount() {
        return items.size();
    }

    public void clickViewAll() {
        viewAll.click();
    }
}
