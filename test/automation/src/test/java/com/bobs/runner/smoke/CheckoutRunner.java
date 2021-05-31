package com.bobs.runner.smoke;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/smoke"},
    tags = {"@Checkout"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/smoke-checkout",
        "html:target/cucumber/smoke-checkout"
    })

public class CheckoutRunner {
}
