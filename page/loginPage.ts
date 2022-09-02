import { Page } from "@playwright/test";
export default class LoginPage{
    private page: Page;
    constructor (page : Page) {
        this.page=page;
    }
    public get eleEmailTextField(){
        return this.page.$("xpath=//input[@type='email']")
    }
   
    public get elePassTextField(){
        return this.page.$("xpath=//input[@type='password']")
    }  
   
    public get eleBtn(){
        return this.page.$("xpath=//button[@type='submit']")
    }

    public async enterEmail(email:string){
        const ele= await this.eleEmailTextField;
        await ele?.type(email);
    }
    
    public async enterPassword(passwrod:string){
        const ele= await this.elePassTextField;
        await ele?.type(passwrod);
    }
    
    public async clickLoginBtn(){
        const ele= await this.eleBtn;
        await ele?.click();
    }
}