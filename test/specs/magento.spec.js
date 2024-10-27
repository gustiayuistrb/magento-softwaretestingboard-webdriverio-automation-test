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

    describe('Review Produk', () => {
        beforeEach(async () => {
            await browser.url('https://magento.softwaretestingboard.com/fusion-backpack.html'); 
        });

        it('Menekan tab reviews yang berada di bawah gambar produk', async () => {
            await ProductPage.goToReviewsTab(); 
            expect(await ProductPage.reviewsTab.isDisplayed()).toBe(true); 
        });

        it('Menekan tombol jumlah review di bawah nama produk', async () => {
            await ProductPage.goToReviews();
            expect(await ProductPage.reviewsTab.isDisplayed()).toBe(true); 
        });
    
        it('Menekan tombol add your review di bawah nama produk ', async () => {
            await ProductPage.goToAddReview();
            expect(await ProductPage.reviewButton.isDisplayed()).toBe(true); 
        });

        it('Mengirim review dengan mengisi semua kolom input', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('Bambang', 'Great Product!', 'I really liked this product.', 5);
            await browser.pause(1000); 
            const successMessage = await ProductPage.successMessage;
            await successMessage.waitForDisplayed(); 
            expect(await successMessage.getText()).toContain('You submitted your review for moderation.');
        });

        it('Mengirim review dengan rating bintang 1', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('Bambang', 'Not good', 'The product did not meet my expectations.', 1);
           
            const successMessage = await ProductPage.successMessage;
            await successMessage.waitForDisplayed(); 
            expect(await successMessage.getText()).toContain('You submitted your review for moderation.');
        });

        it('Mengirim review dengan rating bintang 5', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('Fahmi', 'Excellent!', 'The best product I have ever used!', 5);
            
            const successMessage = await ProductPage.successMessage;
            await successMessage.waitForDisplayed(); 
            expect(await successMessage.getText()).toContain('You submitted your review for moderation.');
        });

        it('Mengirim review tanpa rating', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('Alice', 'Average Product', 'It was okay, nothing special.', '');
            
            const errorMessage = await $('div[for="ratings[4]"]');
            await errorMessage.waitForDisplayed(); 
            expect(await errorMessage.getText()).toContain('Please select one of each of the ratings above.');
        });

        it('Mengirim review tanpa nickname', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('', 'Nice!', 'I enjoyed using this product.', 4);
            const errorMessage = await $('#nickname_field-error');
            await errorMessage.waitForDisplayed(); 
            expect(await errorMessage.getText()).toContain('This is a required field.');
        });

        it('Mengirim review tanpa summary', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('Bob', '', 'Detailed review content here.', 3);
            const errorMessage = await $('#summary_field-error');
            await errorMessage.waitForDisplayed(); 
            expect(await errorMessage.getText()).toContain('This is a required field.');
        });

        it('Mengirim review tanpa isi review', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('Charlie', 'Good Product', '', 4);
            const errorMessage = await $('#review_field-error');
            await errorMessage.waitForDisplayed(); 
            expect(await errorMessage.getText()).toContain('This is a required field.');
        });

        it('Mengirim review tanpa mengisi input', async () => {
            await ProductPage.goToReviews();
            await ProductPage.submitReview('', '', '', '');

            const errorNickname = await $('#nickname_field-error');
            const errorSummary = await $('#summary_field-error');
            const errorReview = await $('#review_field-error');
            const errorRating = await $('div[for="ratings[4]"]');

            await errorNickname.waitForDisplayed();
            await errorSummary.waitForDisplayed();
            await errorReview.waitForDisplayed();
            await errorRating.waitForDisplayed();

            expect(await errorNickname.getText()).toContain('This is a required field.');
            expect(await errorSummary.getText()).toContain('This is a required field.');
            expect(await errorReview.getText()).toContain('This is a required field.');
            expect(await errorRating.getText()).toContain('Please select one of each of the ratings above.');
        });
    });

});