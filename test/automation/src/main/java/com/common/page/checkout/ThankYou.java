package com.common.page.checkout;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class ThankYou extends PageObject {

    @FindBy(xpath = ".//div[contains(@id,'maincontent')]")
    private WebElement orderConfirm;

    public ThankYou(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(orderConfirm));
    }

    public boolean isDisplayed() {
        wait.until(ExpectedConditions.visibilityOf(orderConfirm));
        WebElement receipt = orderConfirm.findElement(By.xpath(".//div[contains(@class,'container')]"));

        return receipt.isDisplayed();

    }

    /*public boolean isDisplayed() {
        //wait.until(ExpectedConditions.visibilityOf(orderConfirm));

        WebElement receipt = orderConfirm.findElement(By.xpath(".//div[contains(@class,'container receipt ')]"));
        return receipt.isDisplayed();
    }*/


}
