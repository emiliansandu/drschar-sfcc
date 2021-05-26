package com.common.page.checkout;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

public class BillingInformation extends PageObject {
    /*@FindBy(className = "shipping-content")
    private WebElement billingAddress;*/

    @FindBy(id = "dwfrm_billing")
    private WebElement paymentData;

    @FindBy(id = "braintree-hosted-field-number")
    private WebElement paymentInfo;

    @FindBy(xpath = "//div[contains(@id,'maincontent')]")
    private WebElement billingAddress;


    public BillingInformation(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(billingAddress));
    }

    public void fillBillingAddress() {

        WebElement field = billingAddress.findElement(By.id("shippingFirstNamedefault"));
        field.sendKeys(propertyReader.getProperty("billing.name"));

        //field = billingAddress.findElement(By.id("shippingLastNamedefault"));
        //field.sendKeys(propertyReader.getProperty("billing.last"));

        driver.findElement(
            By.xpath("//input[@id='shippingLastNamedefault']")
        ).sendKeys("Test");

        driver.findElement(
            By.xpath("//input[@id='shippingAddressOnedefault']")
        ).sendKeys("123 Main St");

        //field = billingAddress.findElement(By.id("shippingAddressOnedefault"));
        //field.sendKeys(propertyReader.getProperty("billing.address1"));
        driver.findElement(
            By.xpath("//input[@id='shippingZipCodedefault']")
        ).sendKeys("94105");

        driver.findElement(
            By.xpath("//input[@id='shippingPhoneNumberdefault']")
        ).sendKeys("9123333333");

        Select select = new Select(billingAddress.findElement(By.id("shippingCountrydefault")));
        select.selectByValue(propertyReader.getProperty("billing.country"));

        driver.findElement(
            By.xpath("//input[@id='shippingAddressCitydefault']")
        ).sendKeys("San Francisco");


        //field = billingAddress.findElement(By.id("shippingAddressCitydefault"));
        //field.sendKeys(propertyReader.getProperty("billing.city"));


        select = new Select(billingAddress.findElement(By.id("shippingStatedefault")));
        select.selectByValue(propertyReader.getProperty("billing.state"));


        /*field = billingAddress.findElement(By.id("shippingZipCodedefault"));
        field.sendKeys(propertyReader.getProperty("billing.zip"));

        field = billingAddress.findElement(By.id("shippingPhoneNumberdefault"));
        field.sendKeys(propertyReader.getProperty("billing.phone"));*/



    }

    public void fillPaymentData() {
        wait.until(ExpectedConditions.visibilityOf(paymentData));

        WebElement field = paymentData.findElement(By.id("email"));
        field.sendKeys(propertyReader.getProperty("payment.email"));

        field = paymentData.findElement(By.id("cardNumber"));
        field.sendKeys(propertyReader.getProperty("payment.cardNum"));

        Select select = new Select(paymentData.findElement(By.id("expirationMonth")));
        select.selectByValue(propertyReader.getProperty("payment.Month"));

        select = new Select(paymentData.findElement(By.id("expirationYear")));
        select.selectByValue(propertyReader.getProperty("payment.Year"));

        field = paymentData.findElement(By.id("securityCode"));
        field.sendKeys(propertyReader.getProperty("payment.cvv"));


    }

    public void fillEmailData() {
        wait.until(ExpectedConditions.visibilityOf(paymentData));

        WebElement field = paymentData.findElement(By.id("email"));
        field.sendKeys(propertyReader.getProperty("payment.email"));
    }

        public void fillCvv() {
        wait.until(ExpectedConditions.visibilityOf(paymentData));

        WebElement field = paymentData.findElement(By.id("saved-payment-security-code"));
        field.sendKeys(propertyReader.getProperty("payment.cvv"));
    }


}


