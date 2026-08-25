import { Page, Locator, expect } from "@playwright/test"

export class InventoryPage {
    private readonly page: Page;
    private readonly title: Locator;
    private readonly cartCount: Locator;
    private readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title')
        this.cartCount = page.locator('[data-test="shopping-cart-badge"]')
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]')
    }

    async addProductToCart(productSlug: string) {
        this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
    }

    async navigateToCart() {
        await this.cartIcon.click();
    }

    async assertPageLoaded() {
        await expect(this.title).toHaveText('Products');
    }

    async assertCartCount(count: number) {
        await expect(this.cartCount).toHaveText(count.toString());
    }
}