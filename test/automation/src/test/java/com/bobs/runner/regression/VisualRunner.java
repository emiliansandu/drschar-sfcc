package com.bobs.runner.regression;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/regression/Visual"},
    tags = {"@Visual"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/visual-regression",
        "html:target/cucumber/visual-regression"
    })

public class VisualRunner {
}
