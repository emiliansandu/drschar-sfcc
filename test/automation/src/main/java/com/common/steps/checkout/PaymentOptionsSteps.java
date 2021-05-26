package com.common.steps.checkout;

import com.common.page.checkout.PaymentOptions;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;

public class PaymentOptionsSteps extends DriverFactory {
    private PaymentOptions payments = new PaymentOptions(getDriver());

    @Then("^Verify (Wire) payment is selected$")
    public void verify_selected_payment(String expected) {
        String actual = payments.getPaymentMethod();
        assertEquals("Selected payment method", expected, actual);
    }

    @Given("$$User selects Paypal as payment method")
    public void select_method(String method) {
        if (method.equals("PAYPAL")) {
            payments.selectPaymentMethod(payments.PAYPAL);
        } else if (method.equals("Wire")) {
            payments.selectPaymentMethod(payments.WIRE);
        }

    }
}
