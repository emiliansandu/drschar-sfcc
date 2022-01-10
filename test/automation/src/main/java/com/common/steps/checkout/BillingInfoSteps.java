package com.common.steps.checkout;

import com.common.page.checkout.BillingInformation;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;

public class BillingInfoSteps extends DriverFactory {
    private BillingInformation billing = new BillingInformation(getDriver());
    private BillingInformation payment = new BillingInformation(getDriver());

    @Given("User fills billing data")
    public void fill_billing_data() {billing.fillBillingAddress();}

    @Given("User fills email data")
    public void fill_email_data() {payment.fillEmailData();}

    @Given("User fills payment data")
    public void fill_payment_data() {payment.fillPaymentData();}

    @Given("User fills Payment cvv field")
    public void fill_cvv() {payment.fillCvv();}
}