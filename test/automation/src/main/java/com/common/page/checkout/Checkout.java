package com.common.page.checkout;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class Checkout extends PageObject {
    @FindBy(xpath = "//div[contains(@id,'maincontent')]")
    private WebElement checkout;

    @FindBy(xpath = "//div[contains(@class,'next-step-button')]")
    private WebElement next;

    @FindBy (id = "payment-info")
    private WebElement paymentInfo;

    @FindBy (xpath = "//div[contains(@id,'form-nav billing-nav payment-information)]")
    private WebElement payments;

    @FindBy(xpath = "//div[contains(@id,'paypal-content')]")
    private WebElement paypal;

    @FindBy(xpath = "//div[contains(@class,'paypal-checkout-overlay')]")
    private WebElement payLogin;

        public Checkout(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(checkout));
    }

    public void clickVerifyCheckout() {
        WebElement button = paymentInfo.findElement(
                By.xpath(".//div[contains(@class,'next-step-button')]" +
                        "/.//button[@name='submit' and @value='submit-payment']"));
        hover(button);
        button.click();
    }

    public void clickCheckoutGuest() {
        WebElement guest = driver.findElement(By.xpath(".//a[contains(@class,'checkout-as-guest')]"));
        guest.click();
    }

    public void clickNextPayment() {
        wait.until(ExpectedConditions.visibilityOf(next));
        WebElement payment = checkout.findElement(By.xpath(".//button[contains(@class,'submit-shipping')]"));
        payment.click();
    }

    public void clickPaypalCheckout() {
        wait.until(ExpectedConditions.visibilityOf(paypal));
        //driver.switchTo().frame("jsx-iframe-40b61fe5e9");
        WebElement payCheckout = driver.findElement(By.xpath(".//div[contains(@class,'paypal-button')]"));
        payCheckout.click();
    }

    public void clickCC() {
        wait.until(ExpectedConditions.visibilityOf(payments));
        WebElement order = driver.findElement(By.xpath(".//img[contains(@class,'credit-card-option')]"));
        order.click();
    }

    public void clickNextPlaceOrder() {
        WebElement order = driver.findElement(By.xpath(".//button[contains(@class,'submit-payment')]"));
        order.click();
    }

    public void clickPlaceOrder() {
        wait.until(ExpectedConditions.visibilityOf(checkout));
        WebElement placeOrder = driver.findElement(By.xpath(".//button[contains(@class,'place-order')]"));
        placeOrder.click();
    }

    public boolean isDisplayed() {
        return checkout.isDisplayed();
    }

    public boolean paypalisDisplayed() {
        return paypal.isDisplayed();
    }

    public boolean payloginisDisplayed() {
        return payLogin.isDisplayed();
    }

    public void clickPaypalPayment() {
        //wait.until(ExpectedConditions.visibilityOf(payments));
        WebElement order = driver.findElement(By.xpath(".//li[contains(@data-method-id,'PayPal')]"));
        order.click();
    }

}
