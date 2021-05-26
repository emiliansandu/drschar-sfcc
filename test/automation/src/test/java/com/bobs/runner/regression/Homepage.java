package com.bobs.runner.regression;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"features/regression/Homepage"},
    tags = {"@Homepage"},
    glue = {"com.common.steps"},
    plugin = {
        "junit:target/junit/homepage-regression",
        "html:target/cucumber/homepage-regression"
    })

public class Homepage {
}
