package com.common.page.pdp;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

public class PdpWaitForm extends PageObject {
    private String waitFormXpath = ".//div[@class='formWait']";
    private WebElement form;

    public PdpWaitForm(WebDriver driver) {
        super(driver);

        List<WebElement> formList = driver.findElements(By.xpath(waitFormXpath));
        if (formList.size() > 0) {
            form = formList.get(0);
        }
    }

    public boolean isVisible() {
        return form.isDisplayed();
    }

    public void submitForm() {
        String customerEmail = propertyReader.getProperty("customer.email");
        WebElement input = form.findElement(By.id("email"));
        WebElement button = form.findElement(By.tagName("button"));
        WebElement modal = form.findElement(By.id("modal"));

        input.sendKeys(customerEmail);
        button.click();

        wait.until(ExpectedConditions.visibilityOf(modal));
    }

    public boolean isSuccessModalDisplayed(){
        WebElement modal = form.findElement(By.id("modal"));
        return modal.isDisplayed();
    }
}
