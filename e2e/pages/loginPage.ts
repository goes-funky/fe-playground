import { Page } from "@playwright/test";

export default class LoginPage {
    

constructor(public page: Page){
    
}

async enterEmail(email: string){
    await this.page.locator('input[type="email"]').type(email);
}
async enterPassword(password: string){
    await this.page.locator('input[type="password"]').type(password);
}
async clickSubmit(){
    await this.page.click('button:has-text("Submit")');
}
async logInToY42(email: string, password: string){
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmit();
}


}