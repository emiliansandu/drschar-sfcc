package com.common.page.homepage;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

public class Video extends PageObject {
    @FindAll({@FindBy(className = "our-story-home")})
    private List<WebElement> videos;

    public Video(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOfAllElements(videos));
    }

    public void playVideo(int index) {
        WebElement video = videos.get(index);
        WebElement play = video.findElement(By.tagName("i"));

        play.click();
    }

    public boolean isVideoShown(int index) {
        WebElement video = videos.get(index);
        WebElement iframe = video.findElement(By.tagName("iframe"));

        WebDriver videodriver = driver.switchTo().frame(iframe);
        //wait is needed
        //chromedriver bug: https://bugs.chromium.org/p/chromedriver/issues/detail?id=3361
        wait(3);
        WebElement youtube = videodriver.findElement(By.id("player"));

        return youtube.isDisplayed();
    }
}
