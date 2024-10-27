import { browser, $, expect } from '@wdio/globals';
import ProductPage from '../pageobjects/product.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Product Page Tests', () => {
    describe('Fitur Tambahkan ke Keranjang', () => {
        beforeEach(async () => {
            await browser.url('https://magento.softwaretestingboard.com/fusion-backpack.html'); 
            await browser.pause(3000);
        });

        it('Add to cart dengan qty 1', async () => {
            await CartPage.addToCart(1); 

            const successMessage = await CartPage.verifySuccessMessage(); 
            expect(successMessage).toContain('You added Fusion Backpack to your shopping cart.'); 
        
            await CartPage.verifyCartQuantity('1'); 
            await CartPage.verifyCartText('My Cart');
        });

        it('Add to cart dengan qty 0', async () => {
            await CartPage.addToCart(0);
            const errorMessage = await $('#qty-error');
            await errorMessage.waitForDisplayed();
            expect(await errorMessage.getText()).toContain('Please enter a quantity greater than 0.');
        });

        it('Add to cart dengan qty -1', async () => {
            await CartPage.addToCart(-1);
            const errorMessage = await $('#qty-error');
            await errorMessage.waitForDisplayed();
            expect(await errorMessage.getText()).toContain('Please enter a quantity greater than 0.');
        });

        it('Add to cart dengan qty 9999', async () => {
            await CartPage.addToCart(9999);
            const errorMessage = await $('.message-error');
            await errorMessage.waitForDisplayed();
            expect(await errorMessage.getText()).toContain('The requested qty is not available');
        });

        it('Add to cart dengan qty 10000', async () => {
            await CartPage.addToCart(10000);
            const errorMessage = await $('.message-error');
            await errorMessage.waitForDisplayed();
            expect(await errorMessage.getText()).toContain('The requested qty exceeds the maximum qty allowed in shopping cart');
        });

        it('Add to cart dengan mengosongkan qty', async () => {
            await CartPage.addToCart('');
            const errorMessage = await $('#qty-error');
            await errorMessage.waitForDisplayed();
            expect(await errorMessage.getText()).toContain('Please enter a valid number in this field.');
        });
    });

});