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

    @FindBy(xpath = "//li[contains(@id,'paymentMethod')]")
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

        field = billingAddress.findElement(By.id("emailOnShipping"));
        field.sendKeys(propertyReader.getProperty("billing.emailOnShipping"));



    }

    public void fillEmailData() {
        wait.until(ExpectedConditions.visibilityOf(billingAddress));

        WebElement field = paymentData.findElement(By.id("emailOnShipping"));
        field.sendKeys(propertyReader.getProperty("billing.emailOnShipping"));
    }

    public void fillPaymentData() {
        wait.until(ExpectedConditions.visibilityOf(paymentData));

       /* WebElement field = paymentData.findElement(By.id("email"));
        field.sendKeys(propertyReader.getProperty("payment.email"));*/

        /*driver.switchTo().frame("js-iframe");
            driver.findElement(
                By.xpath("//input[@id='encryptedCardNumber']")
            ).sendKeys("4111111111111111");
        driver.switchTo().defaultContent();*/

        WebElement frameElementCC = driver.findElement(By.xpath("//fieldset//ul[@id='paymentMethodsList']//iframe"));
        driver.switchTo().frame(frameElementCC);
           driver.findElement(
               By.xpath("//input[@id='encryptedCardNumber']")
           ).sendKeys("4111111111111111");
        driver.switchTo().defaultContent();

        WebElement frameElementDate = driver.findElement(By.xpath("//div[@class='adyen-checkout__card__exp-cvc adyen-checkout__field-wrapper']//iframe"));
        driver.switchTo().frame(frameElementDate);
        driver.findElement(
            By.xpath("//input[@id='encryptedExpiryDate']")
        ).sendKeys("03/30");
        driver.switchTo().defaultContent();

        WebElement frameElementCVV = driver.findElement(By.xpath("//div[@class='adyen-checkout__field adyen-checkout__field--50 adyen-checkout__field__cvc adyen-checkout__field--securityCode']//iframe"));
        driver.switchTo().frame(frameElementCVV);
        driver.findElement(
            By.xpath("//input[@id='encryptedSecurityCode']")
        ).sendKeys("737");
        driver.switchTo().defaultContent();

    }

        public void fillCvv() {
        wait.until(ExpectedConditions.visibilityOf(paymentData));

        WebElement field = paymentData.findElement(By.id("saved-payment-security-code"));
        field.sendKeys(propertyReader.getProperty("payment.cvv"));
    }


}


