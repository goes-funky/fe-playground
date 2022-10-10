import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ProductService} from './product.service';
import {HttpTestingController} from "@angular/common/http/testing";
import {of, throwError} from "rxjs";
import {ProductHttpService} from "./product-http.service";
import {HttpClientModule} from "@angular/common/http";

fdescribe('ProductService tests', () => {
    let productService: any;
    let productHttp: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            providers: [HttpTestingController, ProductHttpService],
        }).compileComponents();
    });

    beforeEach(() => {
        productService = TestBed.inject(ProductService);
        productHttp = TestBed.inject(ProductHttpService);
    });

    afterAll(() => {
        productService = null;
        productHttp = null;
    });

    it('should create service', () => {
        expect(productService).toBeTruthy();
    });

    it('should get add product successfully', (() => {
        const connSpy = jest.spyOn(productHttp, 'addProduct').mockReturnValue(of({
            "id": 101,
            "title": "BMW Pencil",
        }));
        const data = [
            {
                "description": "zxczxc",
                "id": 0,
                "price": "05",
                "stock": "06",
                "title": "xczxczxc"
            }
        ]
        const res = productService.addProduct(data).subscribe((result: any) => {
            expect(connSpy).toHaveBeenCalled();
            expect(result.toEqual({ id: 101, title: 'BMW Pencil' }));
        });
        expect(res).toBeTruthy();
    }));

    it('should provide correct values when search api is successful', (() => {
        const data = {
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "...",
            "images": ["...", "...", "..."]
        };
        const connSpy = jest.spyOn(productHttp, 'searchProduct').mockReturnValue(of({
                "products": [
                    data
                ],
                "total": 1,
                "skip": 0,
                "limit": 1
            }
        ));
        const res = productService.searchProduct('iPhone').subscribe((result: any) => {
            expect(connSpy).toHaveBeenCalled();
            expect(result.toEqual(data));
        });
        expect(res).toBeTruthy();
    }));
});
