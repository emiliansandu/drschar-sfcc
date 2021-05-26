package com.common.steps;

import com.common.page.VisualActions;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Then;

public class VisualSteps extends DriverFactory {
    private VisualActions visual = new VisualActions(getDriver());

    @Then("Perform visual verification at ([^\"]*) screen")
    public void verify_visual(String location) {
        visual.snapshot(location, true);
    }

    @Then("Perform checkout visual verification at ([^\"]*) screen")
    public void verify_checkout_visual(String location) {
        visual.snapshot(location, false);
    }

    @Then("^Perform visual verification at ([^\"]*) screen for desktop$")
    public void verify_checkout_visual_desktop(String location) {
        visual.snapshot(location, false);
    }
}
