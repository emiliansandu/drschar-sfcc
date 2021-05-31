package com.bobs.runner.regression;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/regression/PDP"},
    tags = {"@PDP"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/pdp-regression",
        "html:target/cucumber/pdp-regression"
    })

public class PDPRunner {
}
