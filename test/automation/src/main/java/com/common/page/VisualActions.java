package com.common.page;

import com.google.common.base.Predicate;
import io.percy.selenium.Percy;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.util.Arrays;
import java.util.List;

public class VisualActions extends PageObject {
    private final Percy percy;

    public VisualActions(WebDriver driver) {
        super(driver);
        percy = new Percy(driver);
    }

    public void snapshot(String name, boolean snapengage) {
        snapshot(name, snapengage, false);
    }
    public void snapshot(String name, boolean snapengage, boolean isDesktop) {
        if (snapengage) {
            String type = getType();
            if (isDesktop) {
                percy.snapshot(name + " - " + type, Arrays.asList(1200));
            } else {
                percy.snapshot(name + " - " + type);
            }
        } else {
            percy.snapshot(name);
        }
    }

    private String getType() {
        final String snapengageIframe = "//div[@id='designstudio-button']/iframe";

        wait.until(new Predicate<WebDriver>() {
            public boolean apply(WebDriver webDriver) {
                List<WebElement> iframe = driver.findElements(By.xpath(snapengageIframe));
                return iframe.size() > 0;
            }
        });

        WebElement iframe = driver.findElement(By.xpath(snapengageIframe));
        WebDriver snapengage = driver.switchTo().frame(iframe);

        //wait is needed
        //chromedriver bug: https://bugs.chromium.org/p/chromedriver/issues/detail?id=3361
        wait(3);
        WebElement icon = snapengage.findElement(By.tagName("g"));
        String type = icon.getAttribute("id");

        driver.switchTo().defaultContent();

        return type;
    }
}
