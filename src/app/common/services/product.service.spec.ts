import { first, lastValueFrom, take } from 'rxjs';
import { ProductService } from './product.service';
import { ProductHttpService } from './product-http.service';
import { fakeAsync, flush, tick } from '@angular/core/testing';
import { productHttpServiceMock } from "./product-http.service.mock";
import { Product } from "../interfaces/product.interface";

describe('ProductService', () => {
    let httpMock: ProductHttpService;
    let productsService: ProductService;

    describe('addProduct', () => {

        beforeEach(() => {
            httpMock = productHttpServiceMock as ProductHttpService;
            productsService = new ProductService(httpMock);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        const product: Product = {
            "id": 12,
            "title": "Brown Perfume",
            "description": "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
            "price": 40,
            "discountPercentage": 15.66,
            "rating": 4,
            "stock": 52,
            "brand": "Royal_Mirage",
            "category": "fragrances",
            "thumbnail": "https://dummyjson.com/image/i/products/12/thumbnail.jpg",
            "images": [
                "https://dummyjson.com/image/i/products/12/1.jpg",
                "https://dummyjson.com/image/i/products/12/2.jpg",
                "https://dummyjson.com/image/i/products/12/3.png",
                "https://dummyjson.com/image/i/products/12/4.jpg",
                "https://dummyjson.com/image/i/products/12/thumbnail.jpg"
            ]
        };

        it('should add product to products$', async () => {
            await expect(lastValueFrom(productsService.products$.pipe(first()))).resolves.toEqual([]);
            await lastValueFrom(productsService.addProduct(product));
            await expect(lastValueFrom(productsService.products$.pipe(first()))).resolves.toEqual([product]);
        });

    });

    describe('Last moment fetched', () => {

        beforeEach(() => {
            httpMock = productHttpServiceMock as ProductHttpService;
            productsService = new ProductService(httpMock);
        });

        it('it should monitor the current difference in seconds from the last moment the products$$ was updated', fakeAsync(async () => {
            tick(1);
            await expect(lastValueFrom(productsService.lastFetchedMoment$$.pipe(take(1)))).resolves.toEqual(0);
            flush();
        }));
    });
});