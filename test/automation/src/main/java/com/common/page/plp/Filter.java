package com.common.page.plp;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

public class Filter extends PageObject {
    @FindBy(xpath = "//div[contains(@class,'refinement-bar')]")
    private WebElement refinementBar;
    private WebElement filterBar;

    public Filter(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(refinementBar));
    }

    public void selectRefinement(String value) {
        WebElement span = refinementBar.findElement(By.xpath(".//span[@data-value='" + value + "']"));
        WebElement button = span.findElement(By.xpath(".//ancestor::button"));

        button.click();
        waitForOverlay();

        filterBar = driver.findElement(By.xpath(".//div[@class='filter-bar']"));
    }

    public List<String> getFilterChips() {
        List<WebElement> chips = filterBar.findElements(By.xpath(".//li/button/span"));
        List<String> chipsText = new ArrayList<String>(chips.size());

        for (WebElement chip:chips) {
            chipsText.add(chip.getText());
        }

        return chipsText;
    }

    public void removeFilter(int index) {
        List<WebElement> chips = filterBar.findElements(By.xpath(".//li/button"));
        WebElement filter = chips.get(index);

        filter.click();
        waitForOverlay();
    }

}
