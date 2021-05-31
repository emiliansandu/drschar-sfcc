package com.common.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LogIn extends PageObject {
    //@FindBy(xpath = "//div[@data-action='Login-Show']")
    @FindBy(xpath = "//div[contains(@id,'maincontent')]")
    private WebElement loginContainer;

    /*@FindBy (className = "login")
    private WebElement loginForm;*/

    @FindBy (id = "login-form-email")
    private WebElement email;

    @FindBy (id = "login-form-password")
    private WebElement password;

    public LogIn(WebDriver driver) {
        super(driver);
        wait.until(ExpectedConditions.visibilityOf(loginContainer));
    }

    public void logIn() {
        String customerEmail = propertyReader.getProperty("customer.email");
        String customerPassword = propertyReader.getProperty("customer.password");

        email.sendKeys(customerEmail);
        password.sendKeys(customerPassword);

        //WebElement login = loginContainer.findElement(By.xpath(".//form[@name='login-form']/.//button"));
        //WebElement login = loginForm.findElement(By.xpath(".//button[contains(@class,'btn-primary')]"));
        WebElement login = loginContainer.findElement(By.xpath(".//div[@class='card-body']/.//form[@name='login-form']/.//button"));
        login.click();

        //wait.until(ExpectedConditions.stalenessOf(login));
    }


}
