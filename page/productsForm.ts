import { Page } from "@playwright/test";
export default class ChangeData{
    private page: Page;
    constructor (page : Page) {
        this.page=page;
    }
    public get firstRow(){
        return this.page.$('xpath=////div[@row-index="0"]')
    }

    public get productsDataTable(){
        return this.page.$('xpath=//mat-bottom-sheet-container[@role="dialog"]')
    }

    public get produtTitle(){
        return this.page.$('xpath=//input[@data-placeholder="Title"]')
    }
    public get produtDescription(){
        return this.page.$('xpath=//input[@data-placeholder="Description"')
    }
    public get produtPrice(){
        return this.page.$('xpath=//input[@data-placeholder="Price"')
    }
    public get produtStock(){
        return this.page.$('xpath=//input[@data-placeholder="Stock"')
    }
    public get produtSubmitBtn(){
        return this.page.$('xpath=//button[@type="submit"]')
    }
    public get productStockCell(){
        return this.page.$('xpath=//div[@comp-id="1608"]')
    }
    public get productPriceCell(){
        return this.page.$('xpath=//div[@comp-id="1883"]')
    }
    
 
     public get stockCell(){
         return this.page.$('xpath=//div[@col-id="stock"]')
    }



    public async doubleClickTheFirstRow(){
        const ele= await this.firstRow;
        await ele?.dblclick();
        
    }
    async isProductFormVisible() {
        const ele= await this.productsDataTable;
        if(await ele?.isVisible()){
            console.log("true");
        }
    }
     
    public async changeProductTitle(title:string){
        const ele= await this.produtTitle;
        await ele?.fill(title);
    }
    public async changeProductDescription(description:string){
        const ele= await this.produtDescription;
        await ele?.fill(description);
    }
    public async changeProductPrice(price: string){
        const ele= await this.produtPrice;
        await ele?.fill(price);
    }
    public async changeProductStock(stock: string){
        const ele= await this.produtStock;
        await ele?.fill(stock);
    }
    public async clickSubmitBtn(){
        const ele= await this.produtSubmitBtn;
        if(await ele?.isVisible()){
            await ele?.click();
        }
    }
    public async doubleClickTheStockCell(){
        const join= await this.productStockCell;
        await join?.dblclick();
        await join?.type("2")
        
    }
    public async doubleClickThePriceCell(){
        const join= await this.productPriceCell;
        await join?.dblclick();
        await join?.type("2")
        
    }
    public async clickStockHeader(){
        const join= await this.stockCell;
        await join?.dblclick();
    } 
    public async rowIndex(index:string){
        const element=this.page.locator('xpath=//div[@class="ag-center-cols-container"]//div[@row-index='+index+']');
        await element?.fill(index);
    }

   
}