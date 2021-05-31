package com.common.steps;

import com.common.page.Cart;
import com.common.utils.DriverFactory;
import com.common.utils.StateHolder;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class CartSteps extends DriverFactory {
    private Cart cart = new Cart(getDriver());
    private StateHolder stateHolder = StateHolder.getInstance();

    @Then("Verify product added from PDP is in cart")
    public void productFromPDP() {
        String expectedProduct = (String) stateHolder.get("addToCartPDP");
        expectedProduct = expectedProduct.toLowerCase();
        List<String> cartProducts = cart.getItems();

        assertTrue(expectedProduct + " not found in cart", cartProducts.contains(expectedProduct));
    }

    @Given("Customer starts checkout")
    public void startCheckout() {
        cart.clickCheckout();
    }

    @Then("Verify cart is displayed")
    public void isDisplayed() {assertTrue("Cart not displayed", cart.isDisplayed());}

    @Given("User edit qty to 2 in first product")
    public void edit_qty() {
        cart.updateQty(0,2);
    }

    @Given("User clicks update in first item")
    public void update_item() {
        cart.updateItem(0);
    }

    @Given("User removes first item")
    public void remove_item() {
        cart.removeItem(0);
    }

    @Then("Verify error message displays ([^\"]*)")
    public void verify_error(String expected) {
        assertEquals(expected, cart.getErrorMessage());
    }

    @Then("Verify cart is empty")
    public void verify_empty_cart() {
        assertTrue(cart.isEmpty());
    }
}
