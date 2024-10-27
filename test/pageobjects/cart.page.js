import { browser, $, expect } from '@wdio/globals';

class CartPage {
    get addToCartButton() { return $('#product-addtocart-button'); }
    get quantityInput() { return $('#qty'); }
    get cartLink() { return $('.action.viewcart'); }
    get productInfo() { return $('.product-info'); }
    get productQuantity() { return $('.quantity'); }
    get successMessage() { return $('.message-success'); }
    get cartQuantity() { return $('.minicart-wrapper .counter-number'); }
    get cartText() { return $('.minicart-wrapper .text'); }

    
    async addToCart(quantity) {
        await this.quantityInput.setValue(quantity);
        const button = this.addToCartButton;
        await button.click();
    }

    async checkCartContents(expectedQuantity, expectedInfo) {
        await this.cartLink.click();
        await browser.pause(2000);
        
        await this.productQuantity.waitForDisplayed();
        await this.productInfo.waitForDisplayed();

        const cartQuantity = await this.productQuantity.getText();
        const cartInfo = await this.productInfo.getText();

        expect(cartQuantity).toBe(expectedQuantity);
        expect(cartInfo).toContain(expectedInfo);
    }

    async verifySuccessMessage() {
        await this.successMessage.waitForDisplayed();
        return this.successMessage.getText();
    }

    async verifyCartQuantity(expectedQuantity) {
        await this.cartQuantity.waitForDisplayed();
        expect(await this.cartQuantity.getText()).toBe(expectedQuantity);
    }

    async verifyCartText(expectedText) {
        await this.cartText.waitForDisplayed();
        expect(await this.cartText.getText()).toContain(expectedText);
    }
}

export default new CartPage();
