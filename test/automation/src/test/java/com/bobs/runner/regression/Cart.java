package com.bobs.runner.regression;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/regression/Cart"},
    tags = {"@Cart"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/cart-regression",
        "html:target/cucumber/cart-regression"
    })

public class Cart {
}
