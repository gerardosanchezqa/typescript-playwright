import { Page, Locator, expect } from "@playwright/test"

export class CheckoutPage {
    private readonly page: Page;
    private readonly checkoutButton: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly completeOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]')
        this.firstName = page.locator('[data-test="firstName"]')
        this.lastName = page.locator('[data-test="lastName"]')
        this.postalCode = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        this.finishButton = page.locator('[data-test="finish"]')
        this.completeOrder = page.locator('[data-test="complete-header"]')
    }

    async startCheckout() {
        this.checkoutButton.click();
    }

    async fillInInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async finishCheckout() {
        await this.continueButton.click();
        await this.finishButton.click();
    }

    async assertCompleteOrder(expectedText: string) {
        await expect(this.completeOrder).toHaveText(expectedText);
    }
}