import { test, expect } from "../../src/fixtures/uiFixtures"
import { LoginPage } from "../../src/pages/LoginPage"

test.describe('SauceDemo E2E Checkout flow', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    }) 

    test('User can complete order successfully', async ({
        loginPage,
        inventoryPage,
        checkoutPage,
    }) => {
        await loginPage.login('standard_user', "secret_sauce");
        await inventoryPage.assertPageLoaded();

        await inventoryPage.addProductToCart('sauce-labs-backpack');
        await inventoryPage.assertCartCount(1);

        await inventoryPage.navigateToCart();
        await checkoutPage.startCheckout();
        await checkoutPage.fillInInformation('Gerardo', 'Sanchez', '12345');
        await checkoutPage.finishCheckout();

        await checkoutPage.assertCompleteOrder("Thank you for your order!");
    })

    test('Locked out user sees error message', async ({ loginPage }) => {
        await loginPage.login('locked_out_user', "secret_sauce");
        await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    })
})