import { Page } from "@playwright/test"

export class LoginPage{

    readonly page:Page

    public email = "//input[@data-placeholder='email']"
    public password = "//input[@data-placeholder='Password']"
    public submitButton = "'Submit'"

    constructor(page:Page){
        this.page = page

    }
    async doLogin(Email:string, Password:string){
        await this.page.type(this.email , Email );
        await this.page.type(this.password , Password );
        await this.page.click(this.submitButton)
    }
}
// export default LoginPage