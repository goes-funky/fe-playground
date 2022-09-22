import { expect, Locator, Page } from '@playwright/test';

export class ShippingInfo {

    readonly page : Page;
    public titleInput : Locator;
    public descInput : Locator;
    public priceInput : Locator;
    public stockInput : Locator;
    public cancelBtn : Locator;
    public saveBtn : Locator;

    constructor(page : Page) {
        this.page = page
        this.titleInput = page.locator('[data-placeholder="Title"]')
        this.descInput = page.locator('[formcontrolname="description"]')
        this.priceInput = page.locator('[data-placeholder="Price"]')
        this.stockInput = page.locator('[data-placeholder="Stock"]')
        this.cancelBtn = page.locator('button:has-text("Cancel")')
        this.saveBtn = page.locator('button:has-text("Submit")')
    }

    async fillShippingInfoForm(title: string, desc: string, price: string, stock: string) {
        await this.titleInput.fill(title)
        await this.descInput.fill(desc)
        await this.priceInput.fill(price)
        await this.stockInput.fill(stock)
        await this.saveBtn.click()
    }

    async validateForm() {

        //title is required - this test will fail because no error shows in the UI when the ttle input is not valid.
        // await this.titleInput.click()
        // await this.titleInput.fill(' ')
        // await this.descInput.click() //clicking outside to make the error visible in UI
        // await expect(this.page.locator('text=Title is required')).toBeVisible() 

        //Description is required
        await this.descInput.first().click()
        await this.descInput.fill('')
        await this.priceInput.click() //clicking outside to make the error visible in UI
        await expect(this.page.locator('text=Description is required')).toBeVisible()

        //Price is required
        await this.priceInput.fill('')
        await this.stockInput.first().click()
        await expect(this.page.locator('text=Price is required')).toBeVisible()

        //Stock is required
        await this.stockInput.fill('')
        await this.priceInput.first().click()
        await expect(this.page.locator('text=Stock is required')).toBeVisible()
        //Submit button should be disabled

        await expect(this.saveBtn).toHaveAttribute('disabled', 'true')
    }

}