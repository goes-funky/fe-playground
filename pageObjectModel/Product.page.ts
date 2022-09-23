import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productRowEvenIndex15: Locator;
    readonly stockHeaderCell : Locator;
    readonly cellEditInput : Locator;


    constructor(page: Page) {
        this.page = page;
        this.productRowEvenIndex15 = page.locator(':nth-match(.ag-row-even, 15)');  //using this row for all the tests. Best practice in my opinion would be to grab first row but that was impossible after a lot of tries because there is not a uniqe element to grab
        this.stockHeaderCell = page.locator('div[role="columnheader"]:has-text("Stock")')
        this.cellEditInput = this.page.locator('[aria-label="Input Editor"]')
    }


    async loadPage() {
        await this.page.goto("/products")
    }

    async dblClickProductRow(){
        await this.productRowEvenIndex15.isVisible()
        await this.productRowEvenIndex15.dblclick();
        expect(this.page.locator('text=Shipping Information')).toBeTruthy()
    }

    async changeCellInputDblClick(cellName: string, value: string) : Promise<Boolean>  {
        let bool_for_validation : Boolean
        let priceValue : string = '$'+value

        await this.productRowEvenIndex15.locator('[col-id='+cellName+']').dblclick()
        await this.cellEditInput.fill(value);
        await this.cellEditInput.press('Enter');

        if(cellName == 'price')
            value = priceValue // if I do this before I fill the input the test will fail 
        
        bool_for_validation = (await this.productRowEvenIndex15.locator('[col-id='+cellName+']').textContent() == value) ? true : false
        return bool_for_validation
    }

    async isStockSorted() : Promise<Boolean> {
        var bool_for_validation : Boolean = true
        var refactoredArrOfLocators : Array<any> = [] 
        let stockLocators = (await this.page.locator('[col-id="stock"]').allTextContents())

        //convert from number to string
        stockLocators.slice(1).forEach(el => { //using slice one because the first element is header-cell
            let elnum = Number(el) 
            refactoredArrOfLocators.push(elnum)
        })
        //check if the array is sorted 
        bool_for_validation = refactoredArrOfLocators.every((el, i=1) => {
            let diff = refactoredArrOfLocators[i] - refactoredArrOfLocators[i-1] 
            if(diff < 0 ) {
                return false;
            } else {
                ++i
                return true
            }
        })
        return bool_for_validation
    }

}