package com.common.page.checkout;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class PaymentOptions extends PageObject {

    @FindBy(xpath = "//div[contains(@class, 'card payment-form')]")
    private WebElement payments;

    public final String PAYPAL = "PayPal";
    public final String AMAZON = "AMAZON_PAY";
    public final String AFFIRM = "Affirm";
    public final String CC = "BOLT_PAY";
    public final String WIRE = "Wire";

    public PaymentOptions(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(payments));
    }

    public String getPaymentMethod() {
        WebElement selectedPayment = payments.findElement(
                By.xpath(".//a[contains(@class, 'active')]/ancestor::li[contains(@class,'nav-item')]"));
        return selectedPayment.getAttribute("data-method-id");
    }

    public void selectPaymentMethod(String method) {
        WebElement paymentMethod = payments.findElement(By.xpath(".//li[@data-method-id='"+method+"']"));
        paymentMethod.click();
    }
}
