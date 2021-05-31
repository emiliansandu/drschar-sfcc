package com.common.page.homepage;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;


public class ProductGrid extends PageObject {
    @FindBy(xpath = "//div[@class='home-product-grid' and not (@id='newArrivalsGrid')]")
    private WebElement grid;

    private final List<WebElement> items;

    public ProductGrid(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(grid));
        items = grid.findElements(By.className("home-category-item"));
    }

    public void clickItem() {
        int random = (int) (Math.random() * items.size());
        clickItem(random);
    }

    public void clickItem(int index) {
        WebElement item = items.get(index);

        stateHolder.put("product-grid-name", getItemName(item));
        stateHolder.put("product-grid-count", getItemCount(item));

        item.click();
    }

    public int getItemsCount() {
        return items.size();
    }

    public List<String> getItemsName() {
        List<String> names = new ArrayList<String>(items.size());

        for(WebElement item:items) {
            names.add(getItemName(item));
        }

        return names;
    }

    public int getItemCount(String name) {
        WebElement item = grid.findElement(By.xpath("//span[@class='home-category-name' and text()='" +
                name +"']/ancestor::div[@class='home-category-item']"));

        return getItemCount(item);
    }

    private String getItemName(WebElement item) {
        return item.findElement(By.className("home-category-name")).getText();
    }

    private int getItemCount(WebElement item) {
        String count = item.findElement(By.className("home-category-count")).getText();
        count = count.replace("(","").replace(")","");

        return Integer.parseInt(count);
    }
}
