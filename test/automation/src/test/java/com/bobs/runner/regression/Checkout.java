package com.bobs.runner.regression;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/regression/Checkout"},
    tags = {"@Checkout"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/checkout-regression",
        "html:target/cucumber/checkout-regression"
    })

public class Checkout {
}
