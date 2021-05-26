package com.bobs.runner.smoke;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/smoke"},
    tags = {"@AddToCart"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/smoke-atc",
        "html:target/cucumber/smoke-atc"
    })

public class AddToCartRunner {
}
