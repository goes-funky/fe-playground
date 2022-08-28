import {Page, TestInfo} from "@playwright/test";
import {SWPageLoader} from "../../src/page/loader/sw-page-loader";
import {LoginPage} from "./login/LoginPage";
import {ProductsPage} from "./products/ProductsPage";

export class PageLoader extends SWPageLoader {
    public loginPage: LoginPage;
    public productsPage: ProductsPage;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.loginPage = new LoginPage(page, testInfo);
        this.productsPage = new ProductsPage(page, testInfo);
    }
}