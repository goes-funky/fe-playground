import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from './product.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductHttpService } from './product-http.service';
import { HttpClientModule } from '@angular/common/http';
import * as ProductsData from '../../mocks/products.json'

describe('ProductService tests', () => {
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
        const connSpy = jest.spyOn(productHttp, 'addProduct').mockReturnValue(of(ProductsData.addProduct.output));
        const res = productService.addProduct(ProductsData.addProduct.input).subscribe((result: any) => {
            expect(connSpy).toHaveBeenCalled();
            expect(result.toEqual(ProductsData.addProduct.output));
        });
        expect(res).toBeTruthy();
    }));

    it('should provide correct values when search api is successful', (() => {
        const connSpy = jest.spyOn(productHttp, 'searchProduct')
            .mockReturnValue(of(ProductsData.searchProduct));
        const res = productService.searchProduct('iPhone').subscribe((result: any) => {
            expect(connSpy).toHaveBeenCalled();
            expect(result.toEqual(ProductsData.searchProduct.products));
        });
        expect(res).toBeTruthy();
    }));
});
