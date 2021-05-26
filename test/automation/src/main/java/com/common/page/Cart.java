package com.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

public class Cart extends PageObject {
    @FindBy(xpath = "//div[contains(@data-action,'Cart-Show')]")
    private WebElement cart;

    private final List<WebElement> items;
    private final WebElement proceedCheckout;
    private final WebElement errorMessage;

    public Cart(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(cart));
        items = cart.findElements(
                By.xpath(".//div[contains(@class,'card product-info')]"));
        proceedCheckout = cart.findElement(
                By.xpath(".//a[contains(@class,'checkout-btn')]"));

        errorMessage = cart.findElement(By.xpath(".//div[contains(@class,'cart-error-messaging')]"));
    }

    public List<String> getItems() {
        List<String> itemsInCartText = new ArrayList<String>();
        wait.until(ExpectedConditions.visibilityOfAllElements(items));

        for (WebElement item : items) {
            wait.until(ExpectedConditions.visibilityOf(item));
            WebElement name = item.findElement(By.xpath(".//div[@class='line-item-name']"));
            String text = name.getText();
            String nameText = text.split("\n")[0];
            itemsInCartText.add(nameText.toLowerCase());
        }

        return itemsInCartText;
    }

    public void updateQty(int index, int qty) {
        WebElement item = items.get(index);
        WebElement qtyWE = item.findElement(
                By.xpath(".//div[contains(@class,'line-item-quantity d-flex')]/.//input[contains(@name,'quantity')]"));
        qtyWE.sendKeys(Keys.BACK_SPACE);
        qtyWE.sendKeys(String.valueOf(qty));
    }

    public void updateItem(int i) {
        WebElement item = items.get(i);
        WebElement update = item.findElement(By.xpath(".//button[@class='card-update']"));

        update.click();
    }

    public void removeItem(int i) {
        WebElement item = items.get(i);
        WebElement remove = item.findElement(
                By.xpath(".//div[contains(@class,'line-item-quantity')]/.//button[contains(@data-target,'#removeProductModal')]"));

        remove.click();

        WebElement modal = cart.findElement(By.id("removeProductModal"));
        WebElement confirm = modal.findElement(By.xpath(".//button[contains(@class,'cart-delete-confirmation-btn')]"));

        confirm.click();
    }

    public void clickCheckout() {
        proceedCheckout.click();
    }

    public boolean isDisplayed() {
        return cart.isDisplayed();
    }

    public String getErrorMessage() {
        WebElement alert = errorMessage.findElement(By.tagName("div"));
        return alert.getText();
    }

    public boolean isEmpty() {
        boolean isEmpty = false;
        List<WebElement> empty = cart.findElements(By.xpath(".//div[contains(@class,'cart-empty')]"));

        if (empty.size() > 0) {
            isEmpty = true;
        }

        return isEmpty;
    }
}
