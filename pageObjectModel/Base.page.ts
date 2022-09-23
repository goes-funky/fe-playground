import { Page } from "@playwright/test";

export class BasePage {
    readonly page : Page


    constructor(page : Page) {
        this.page = page
    }


    async getAllTextContentsOfCol(column_name_text : string) : Promise<String[]> { // or you could make it getAllTextContentsOfCol(column_name_text : string)
        column_name_text = column_name_text.toLowerCase()
        var arrOfLocators = []
        let arrContetOfLocators = this.page.locator('[col-id="'+column_name_text+'"]')
        // console.log(arrContetOfLocators)

        const count = await arrContetOfLocators.count()
        for (let i = 0; i < count; ++i)
            arrOfLocators.push(await arrContetOfLocators.nth(i).innerText()); //save all cells text content

        return arrOfLocators.slice(1) //using slice one cuz the first element is col-header
    }

    async checkifValueExistsInCol(column_to_search : string, value_to_search : string) : Promise<Boolean> {
        let bool_for_validation : Boolean = false
        let columnTextContentArr = this.getAllTextContentsOfCol(column_to_search)

        if(column_to_search == 'price') {
            value_to_search = '$'+value_to_search
        }
        for (const value of await columnTextContentArr) {
            if( value == value_to_search) {
                bool_for_validation = true
            }
        }
        return bool_for_validation;
    }
}