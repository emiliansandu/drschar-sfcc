package com.common.steps.checkout;

import com.common.page.checkout.AmazonPay;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;

import static org.junit.Assume.assumeTrue;

public class AmazonPaySteps extends DriverFactory {
    private AmazonPay logIn = new AmazonPay(getDriver());

    @Given("Customer signs in to Amazon Pay")
    public void sign_in() {
        logIn.logIn();
    }

    @Given("Customer clicks on Continue Checkout")
    public void continue_checkout() {
        assumeTrue(logIn.continueCheckout());
    }
}
