package com.common.page;

import com.common.utils.PropertyReader;
import com.common.utils.StateHolder;
import com.common.utils.Util;
import com.google.common.base.Predicate;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class PageObject {
    protected final WebDriverWait wait;
    protected final WebDriver driver;
    public StateHolder stateHolder = StateHolder.getInstance();
    protected PropertyReader propertyReader = PropertyReader.getPropertyReader();

    public PageObject(WebDriver driver) {
        this.driver = driver;
        this.wait = Util.createWebDriverWait(driver);

        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 60), this);
    }

    public void waitForOverlay () {
        wait.until(new Predicate<WebDriver>() {
            public boolean apply(WebDriver webDriver) {
                List<WebElement> overlayList = driver.findElements(By.xpath("//div[@class='veil']"));
                return overlayList.size() == 0;
            }
        });
    }

    public String getH1() {
        WebElement h1 = driver.findElement(By.tagName("h1"));
        return h1.getText();
    }

    protected void wait(int s) {
        try {
            Thread.sleep(s * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    protected void hover(WebElement element) {
        Actions actions = new Actions(driver);
        actions.moveToElement(element).build().perform();
    }

    public String getCurrentURL() {

        return driver.getCurrentUrl();
    }

    public void scrollTop() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollTo(0, 0);");
    }
 }
