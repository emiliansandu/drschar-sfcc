package com.bobs.runner.regression;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/regression/PLP"},
    tags = {"@PLP"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/plp-regression",
        "html:target/cucumber/plp-regression"
    })

public class PLPRunner {
}
