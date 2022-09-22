import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productRowEvenIndex15: Locator;
    readonly stockHeaderCell : Locator;

    constructor(page: Page) {
        this.page = page;
        this.productRowEvenIndex15 = page.locator(':nth-match(.ag-row-even, 15)');  //using this row for all the tests. Best practice in my opinion would be to grab first row but that was impossible after a lot of tries because there is not a uniqe element to grab
        this.stockHeaderCell = page.locator('div[role="columnheader"]:has-text("Stock")')
    }

    async clickProductRow(){
        await this.productRowEvenIndex15.isVisible()
        await this.productRowEvenIndex15.dblclick();
        expect(this.page.locator('text=Shipping Information')).toBeTruthy()
    }

    async changeCellInputDblClick(cellName: string, value: string)  {
        let bool_for_validation : Boolean
        let priceValue : string = '$'+value

        if(cellName == 'stock') {
            await this.productRowEvenIndex15.locator('[col-id="stock"]').dblclick()
            await this.page.locator('[aria-label="Input Editor"]').fill(value);
            await this.page.locator('[aria-label="Input Editor"]').press('Enter');

        }else if(cellName == 'price') {
            // priceValue = '$'+value
            await this.productRowEvenIndex15.locator('[col-id="price"]').dblclick()
            await this.page.locator('[aria-label="Input Editor"]').fill(value);
            await this.page.locator('[aria-label="Input Editor"]').press('Enter');

            value = priceValue // if I do this before I fill the input the test will fail
        } 

        bool_for_validation = (await this.productRowEvenIndex15.locator('[col-id='+cellName+']').textContent() == value) ? true : false
        expect(bool_for_validation).toBe(true)
    }

    async isStockSorted() {

        var bool_for_validation : Boolean = true
        var refactoredArrOfLocators : Array<Number> = []
        var arrOfLocators = []
        let stockLocators = this.page.locator('[col-id="stock"]')

        //Click on Stock-cell-header
        await this.stockHeaderCell.isVisible()
        await this.stockHeaderCell.click()

        const count = await stockLocators.count()
        for (let i = 0; i < count; ++i)
        arrOfLocators.push(await stockLocators.nth(i).textContent()); //save all the stock cell values

        arrOfLocators.slice(1).forEach(el => { //using slice one cuz the first element was just empty space
            let elnum = Number(el) // convert every element from String to Number
            refactoredArrOfLocators.push(elnum) // push every Number element to the new refactored array
        })

        //check if the array is sorted 
        refactoredArrOfLocators.forEach((el, i=1) => {
            if(refactoredArrOfLocators[i-1] <= refactoredArrOfLocators[i]) {
                bool_for_validation = true
            } else {
                bool_for_validation = false
            }
        })
        expect(bool_for_validation).toBe(true)
        
    }

}