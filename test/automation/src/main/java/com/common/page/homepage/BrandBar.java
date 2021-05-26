package com.common.page.homepage;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class BrandBar extends PageObject {

    @FindBy (className = "brands-bar")
    private WebElement bar;

    public BrandBar(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(bar));
    }

    public void clickBrand(String brand) {
        WebElement brandButton = bar.findElement(
                By.xpath(".//a[contains(text(),'" + brand.toLowerCase() + "')]"));

        brandButton.click();
    }

    public void clickBrand() {
        List<WebElement> brandButtons = bar.findElements(By.tagName("a"));
        int random = (int) (Math.random() * brandButtons.size());
        WebElement brandButton = brandButtons.get(random);

        brandButton.click();
    }

    private int getBrandCount(WebElement brandLink) {
        WebElement count = brandLink.findElement(By.tagName("span"));
        String countText = count.getText().replace("(","").replace(")","");

        return Integer.parseInt(countText);
    }

    public List<String> getBrands() {
        List<String> result = new ArrayList<String>();

        for (WebElement brandName : bar.findElements(By.tagName("a"))) {
            String brand = brandName.getText();
            result.add(brand.replaceAll(" \\(\\d*\\)",""));
        }

        return result;
    }
}
