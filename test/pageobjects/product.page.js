import { browser, $, expect } from '@wdio/globals';

class ProductPage {
    get reviewsLink() { return $('a.action.view'); }
    get reviewsTab() { return $('#tab-label-reviews-title'); }
    get reviewButton() { return $('a.action.add'); }
    get reviewSummary() { return $('#summary_field'); }
    get reviewNickname() { return $('#nickname_field'); }
    get reviewInput() { return $('#review_field'); }
    get submitReviewButton() { return $('button.action.submit.primary'); }
    get successMessage() { return $('div.message-success'); }
    get errorMessage() { return $('.error-message'); } 


    async goToReviews() {
        await this.reviewsLink.click();
        await browser.pause(1000);
    }

    async goToAddReview() {
        await this.reviewButton.click(); 
        await browser.pause(1000); 
    }

    async goToReviewsTab() {
        await this.reviewsTab.click(); 
        await browser.pause(1000);
    }

    async selectRating(rating) {
        if (rating < 1 || rating > 5) {
            throw new Error('Please select one of each of the ratings above.');
        }
        const ratingInput = $(`#Rating_${rating}`); 
        await ratingInput.click(); 
    }

    async submitReview(nickname, summary, review, rating) {
        await this.reviewNickname.setValue(nickname);
        await this.reviewSummary.setValue(summary);
        await this.reviewInput.setValue(review);
        
        if(rating){
            await browser.execute((rating) => {
                document.querySelector(`#Rating_${rating}`).checked = true;
            }, rating);
        }

        await this.submitReviewButton.click();
    }

}

export default new ProductPage();
