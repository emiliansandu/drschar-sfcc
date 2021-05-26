package com.common.page.checkout;

import com.common.page.PageObject;
import com.google.common.base.Predicate;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class AmazonPay extends PageObject {
    @FindBy(id = "authportal-center-section")
    private WebElement authportal;

    @FindBy (id = "ap_email")
    private WebElement email;

    @FindBy (id = "ap_password")
    private WebElement password;

    @FindBy (id = "signInSubmit")
    private WebElement submit;

    public AmazonPay(WebDriver driver) {
        super(driver);

        wait.until(ExpectedConditions.visibilityOf(authportal));
    }

    public void logIn() {
        String customerEmail = propertyReader.getProperty("amazon.pay.email");
        String customerPassword = propertyReader.getProperty("amazon.pay.password");

        email.sendKeys(customerEmail);
        password.sendKeys(customerPassword);
        submit.click();
    }

    public boolean continueCheckout() {
        wait.until(new Predicate<WebDriver>() {
            public boolean apply(WebDriver webDriver) {
                try {
                    WebElement announce = driver.findElement(
                            By.xpath("//input[@aria-labelledby='a-autoid-0-announce']"));
                    announce.click();
                } catch (WebDriverException exception) {
                    return false;
                }
                return true;
            }
        });

        try {
            wait.until(ExpectedConditions.not(ExpectedConditions.urlContains("amazon.com")));
            return true;
        } catch (TimeoutException timeOut) {
            return false;
        }
    }
}
