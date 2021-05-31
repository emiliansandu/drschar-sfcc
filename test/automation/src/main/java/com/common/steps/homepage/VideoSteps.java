package com.common.steps.homepage;

import com.common.page.homepage.Video;
import com.common.utils.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

public class VideoSteps extends DriverFactory {
    private Video video = new Video(getDriver());

    @Given("^User clicks play on (first|second) video$")
    public void play_video(String index) {
        if (index.equals("first")) {
            video.playVideo(0);
        } else {
            video.playVideo(1);
        }
    }

    @Then("^Verify (first|second) video displays youtube video$")
    public void verify_video(String index) {
        if (index.equals("first")) {
            video.isVideoShown(0);
        } else {
            video.isVideoShown(1);
        }
    }
}
