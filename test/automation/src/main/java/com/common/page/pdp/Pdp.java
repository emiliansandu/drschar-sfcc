package com.common.page.pdp;

import com.common.page.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

public class Pdp extends PageObject {
    @FindBy(xpath = "//div[contains(@data-action,'Product-Show')]")
    private WebElement pdp;

    @FindBy(id = "info")
    private WebElement info;

    @FindBy(className = "carousel-inner")
    private WebElement mainImage;

    @FindBy(className = "description-and-detail")
    private WebElement descriptionDetail;

    @FindBy(className = "certificate-sample")
    private WebElement certificate;

    @FindBy(id = "report-sample")
    private WebElement report;

    @FindBy(className = "recommendations")
    private WebElement recommendations;

    private String productNameXpath = ".//div[contains(@class,'col-sm-6')]//h1[contains(@class,'product-name')]";
    private String addToCartXpath = ".//button[contains(@class,'add-to-cart')]";
    private String descriptionXpath = ".//div[contains(@class,'description')]/div";
    private String detailsXpath = ".//div[contains(@class,'details')]/div";
    private String reviewsXpath = ".//div[contains(@class,'reviews')]";
    private String recommendationsXpath = ".//div[contains(@id,'cq_recomm_slot-')]/.//div[@class='product']"; //desktop

    public Pdp (WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(mainImage));
    }

    public String getName() {
        WebElement name = pdp.findElement(By.xpath(productNameXpath));
        return name.getText();
    }

    public String getImageText() {
        WebElement image = pdp.findElement(By.xpath(".//div[contains(@class,'carousel-item active')]/img"));
        String name = image.getAttribute("alt").replace("-", " ");

        return name;
    }

    public boolean isDisplayed() {
        return pdp.isDisplayed();
    }

    public void clickSize() {
        Select select = new Select(pdp.findElement(By.id("size-1")));
        select.selectByValue(propertyReader.getProperty("pdp.size"));
    }

    public void clickAddToCart() {
        stateHolder.put("addToCartPDP", getName());

        WebElement atc = pdp.findElement(By.xpath(addToCartXpath));
        atc.click();
        waitForOverlay();
    }

    public boolean hasAddToCart() {
        List<WebElement> atc = info.findElements(By.xpath(addToCartXpath));
        return atc.size() > 0;
    }

    public boolean hasImage() {
        return mainImage.isDisplayed();
    }

    public boolean hasDescription() {
        boolean isDescription = false;
        List<WebElement> description = descriptionDetail.findElements(By.xpath(descriptionXpath));

        if(description.size() > 0) {
            String descriptionText = description.get(0).getText();
            isDescription = descriptionText.length() > 0;
        }

        return isDescription;
    }

    public boolean hasDetails() {
        boolean isDetails = false;
        List<WebElement> description = descriptionDetail.findElements(By.xpath(detailsXpath));

        if(description.size() > 0) {
            String detailsText = description.get(0).getText();
            isDetails = detailsText.length() > 0;
        }

        return isDetails;
    }

    public boolean hasReviewsSection() {
        List<WebElement> description = descriptionDetail.findElements(By.xpath(reviewsXpath));
        return description.size() > 0;
    }

    public boolean hasAuthCert() {
        return certificate.isDisplayed();
    }

    public void clickAuthCert() {
        certificate.click();
    }

    public boolean reportIsDisplayed() {
        return report.isDisplayed();
    }

    public void closeReport() {
        WebElement close = report.findElement(By.className("close"));
        close.click();
    }

    public void learnMoreReport() {
        WebElement learnMore = report.findElement(By.className("learn-more"));
        learnMore.click();
    }

    public boolean isRecommendationsVisible() {
        return recommendations.isDisplayed();
    }

    public int getRecommendationsCount() {
        List<WebElement> products = recommendations.findElements(By.xpath(recommendationsXpath));
        return products.size();
    }

    public void clickRecommendation(int index) {
        List<WebElement> products = recommendations.findElements(By.xpath(recommendationsXpath));
        WebElement product = products.get(index);

        String name = product.findElement(By.className("pdp-link")).getText();
        stateHolder.put("productName", name);

        product.click();
    }
}
