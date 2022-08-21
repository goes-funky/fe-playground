import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductHttpService } from './product-http.service';
import { mockProductArray } from '../../mocks/products';


describe('ProductsService', () => {
    let service: ProductHttpService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(ProductHttpService);
        httpController = TestBed.inject(HttpTestingController);
    });


    it('should call getAllProducts and return an array of Products', () => {

        service.getAll().subscribe((res) => {
            expect(res).toEqual(mockProductArray);
        });
        const req = httpController.expectOne('/api/products')

        req.flush(mockProductArray);
    });

    it('should call search and return an array of Products', () => {

        const key = 'phone';
        service.search(key).subscribe((res) => {
            expect(res).toEqual(mockProductArray);
        });
        const req = httpController.expectOne(`/api/products/search?q=${key}`)

        req.flush(mockProductArray);
    });
});