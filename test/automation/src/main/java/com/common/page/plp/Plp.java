package com.common.page.plp;

import com.common.page.PageObject;
import com.google.common.base.Function;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

public class Plp extends PageObject {

    @FindBy(xpath = "//div[contains(@id,'product-search-results')]")
    private WebElement container;

    @FindBy(xpath = "//div[contains(@class,'shop-watches-content')]")
    private WebElement watchesContent;

    private final String plpButtonXpath = ".//div[@class='product-tile']/div/div[@class='buttons']/" +
            ".//a[contains(@class,'{button}')]/ancestor::div[@class='product']";

    private final List<WebElement> allProducts;
    private final List<WebElement> inStockProducts;
    private final List<WebElement> waitListProducts;



    public Plp(WebDriver driver){
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(container));

        allProducts = container.findElements(
                By.xpath(".//div[contains(@class,'product-grid')]/div/div"));
        inStockProducts = container.findElements(
                By.xpath(plpButtonXpath.replace("{button}", "buttonBuy")));
        waitListProducts = container.findElements(
                By.xpath(plpButtonXpath.replace("{button}", "buttonWaitList")));
    }

    public String getTitle(){
        WebElement title = driver.findElement(By.tagName("h1"));
        return title.getText();
    }

    public int getProductsLength() {
        return allProducts.size();
    }

    public int getProductsCount() {
        WebElement results = watchesContent.findElement(By.xpath(".//div[contains(@class,'result-count')]/span"));
        String elementText = results.getText()
                .replace("products found","")
                .trim()
                .replace(",","");

        return Integer.parseInt(elementText);
    }

    public void openProduct(int index) {
        WebElement product = allProducts.get(index);

        saveProductName(product);
        clickProduct(product);
    }

    public void openAvailableProduct(int index) {
        WebElement product = inStockProducts.get(index);

        saveProductName(product);
        clickProduct(product);
    }

    public void openWaitlistProduct(int index) {
        WebElement product = waitListProducts.get(index);

        saveProductName(product);
        clickProduct(product);
    }

    private void saveProductName(final WebElement product) {
        WebElement productImage = wait.until(new Function<WebDriver, WebElement>() {
            public WebElement apply(WebDriver webDriver) {
                return product.findElement(
                        By.xpath(".//div[contains(@class,'image-container')]/a/img"));
            }
        });

        wait.until(ExpectedConditions.visibilityOf(productImage));
        String productName = productImage.getAttribute("alt").replace("-", " ");

        stateHolder.put("productName", productName);
    }

    private void clickProduct(WebElement product){
        WebElement image = product.findElement(By.xpath(".//img[contains(@class,'tile-image')]"));
        image.click();
    }

    public void sellButton(int index) {
        WebElement product = inStockProducts.get(index);
        WebElement sellButton = product.findElement(By.xpath(".//a[contains(@class,'button-sell')]"));

        sellButton.click();
    }
}
