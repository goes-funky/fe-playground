import { of } from 'rxjs';
import {Product} from "../interfaces/product.interface";
import {ProductHttpService} from "./product-http.service";
import * as products from "./mocks/products.mock.json";

export const PRODUCTS: Product[] = products

export const PRODUCT = PRODUCTS[0];

export const PRODUCTS_RESPONSE: {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
} = { products: PRODUCTS, total: PRODUCTS.length, skip: 0, limit: 10 };

export const productHttpServiceMock: Partial<ProductHttpService> = {
    getAll: () => of(PRODUCTS_RESPONSE),
    get: () => of(PRODUCT),
} as Partial<ProductHttpService>;