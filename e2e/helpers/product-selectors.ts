import {expect, Page} from "@playwright/test";

export class ProductSelectors {
    static readonly submitButtonLocator: string = 'text=Submit';


    static getRowByIndex(index: number): string {
        return ".ag-center-cols-clipper div[row-index='" + index + "']";
    }

    static getLocatorByFormControlName(formControlName: string) {
        if (formControlName === 'description') {
            return "textarea[formcontrolname='" + formControlName.toLowerCase() + "']"
        } else {
            return "input[formcontrolname='" + formControlName.toLowerCase() + "']"
        }
    }

    static async dblClickAndEdit(page: Page, rowIndex: number, colName: string, newVal: string) {
        const locator: string = this.getRowByIndex(rowIndex) + " div[col-id='" + colName + "']";
        await page.locator(locator).dblclick();
        await expect(page.locator(locator)).toHaveClass(/ag-cell-inline-editing/);
        await page.locator(locator).type(newVal);
        await page.keyboard.press('Enter')
        await page.waitForSelector('mat-spinner', {state: 'hidden'});

        if (colName === 'price') {
            newVal = '$' + newVal + '.00';
        }

        await expect(page.locator(locator)).toHaveText(newVal, {timeout: 10000});
    }

    static async checkFirstRowData(page: Page, rowIndex: number, data: string[]) {
        for (const el of data) {
            await expect(page.locator(this.getRowByIndex(rowIndex) + " div[aria-colindex='" + (data.indexOf(el) === 0 ? data.indexOf(el) + 1 : data.indexOf(el) + 2) + "']")).toHaveText(el)
        }
    }

    static async checkInputFormValidationError(page: Page, inputField: string, expectedError: string) {
        let locator;
        if (inputField === 'description') {
            locator = "textarea[formcontrolname='" + inputField.toLowerCase() + "']"
        } else {
            locator = "input[formcontrolname='" + inputField.toLowerCase() + "']"
        }

        await expect(page.locator(locator)).toHaveClass(/ng-invalid/)

        if (expectedError) {
            await expect(page.locator("//input[@formcontrolname='" + inputField.toLowerCase() + "']/../../..//mat-error")).toHaveText(expectedError);
        }
    }
}