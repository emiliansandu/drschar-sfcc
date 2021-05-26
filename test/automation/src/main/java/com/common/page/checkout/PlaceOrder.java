package com.common.page.checkout;

import com.common.page.PageObject;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class PlaceOrder extends PageObject {
    @FindBy(id = "checkout-main")
    private WebElement checkoutMain;

    public PlaceOrder(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(checkoutMain));
    }

    public boolean isDisplayed() {
        return checkoutMain.isDisplayed();
    }

    public void placeOrder() {
        final WebElement button = checkoutMain.findElement(
                By.xpath(".//button[@name='submit' and @value='place-order']"));

        wait.until(new Predicate<WebDriver>() {
            public boolean apply(WebDriver webDriver) {
                Point p = button.getLocation();
                System.out.println("Button location: "+p.x+","+p.y);

                /* hardcoded for 1204,1080 screen size
                if/when adding multiple screen sizes this workaround needs to be revisited.
                */
                return p.y == 197;
            }
        });

        button.click();

    }
}
