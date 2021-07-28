package com.common.page;

import com.common.utils.Util;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

public class Header extends PageObject{
    @FindBy(xpath = "//a[contains(@class,'logo-home')]")
    private WebElement logo;

    @FindBy(xpath = "//div[contains(@id,'onetrust-button-group-parent')]")
    private WebElement cookie;


    @FindBy(name = "q")
    private WebElement searchInput;

    @FindBy(className = "minicart-link")
    private WebElement minicart;

    @FindBy(id = "certifiedAuthentic")
    private WebElement certified;

    private String headerNavXpath ="//nav/div/ul/li/a[@id ='{}']";
    private String flyNavXpath ="//nav/div/ul/li/a[@id ='{}']/../ul[contains(@class,'dropdown-menu')]";
    private String l2Xpath = "//a[@class='dropdown-link' and text()='{}']";
    private String yesTracking = ".//button[contains(@class,'affirm')]";

    public boolean isLogoVisible(){
        return logo.isDisplayed();
    }

    public Header(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(logo));
    }

    public void hoverCategory(final String category) {
        WebElement categoryNav = driver.findElement(By.xpath(Util.replaceXpath(headerNavXpath, category)));
        hover(categoryNav);

        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(
                By.xpath(Util.replaceXpath(flyNavXpath, category))));
    }

    public void clickCategory(final String category) {
        WebElement categoryNav = driver.findElement(By.xpath(Util.replaceXpath(headerNavXpath, category)));
        categoryNav.click();
    }


    public boolean flyNavIsDisplayed(String category) {
        WebElement flynav = driver.findElement(By.xpath(Util.replaceXpath(flyNavXpath, category)));
        return flynav.isDisplayed();
    }

    public void closeModal() {
        List<WebElement> modal = driver.findElements(By.id("consent-tracking"));

        if(modal.size() > 0) {
            WebElement affirm = modal.get(0).findElement(By.xpath(yesTracking));
            affirm.click();
            wait.until(ExpectedConditions.invisibilityOfAllElements(modal));
        }
    }

    public void closeCookie() {
        wait.until(ExpectedConditions.visibilityOf(cookie));

        wait(10);
        WebElement cookie = driver.findElement(By.xpath(".//button[contains(@id,'onetrust-accept-btn-handler')]"));
        cookie.click();
    }

    public void clickFlyNavCategory(String category) {
        WebElement categoryLink = driver.findElement(By.xpath(Util.replaceXpath(l2Xpath,category)));
        categoryLink.click();
    }

    public void search(String searchTerm) {
        Actions actions = new Actions(driver);
        actions.sendKeys(searchInput, searchTerm + "\n").perform();
    }

    public void clickMiniCart() {
        minicart.click();
    }

    public int getNoItems() {
        String itemsText = minicart.getText();

        return Integer.parseInt(itemsText);
    }

    public void clickLogIn() {
        WebElement login = driver.findElement(By.xpath(".//span[contains(@class,'user-message')]"));
        login.click();
    }

    public void clickCart() {
        WebElement login = driver.findElement(By.xpath(".//a[contains(@class,'minicart-link')]"));
        login.click();
    }
}
