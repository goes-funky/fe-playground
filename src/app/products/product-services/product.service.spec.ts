import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Product, ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';
import { fakeAsync, flush, getTestBed, TestBed, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

let mockData = {
    products: [
        {
            id: 1,
            title: 'iPhone 9',
            description: 'An apple mobile which is nothing like apple',
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: 'Apple',
            category: 'smartphones',
            thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
            images: [
                'https://dummyjson.com/image/i/products/1/1.jpg',
                'https://dummyjson.com/image/i/products/1/2.jpg',
                'https://dummyjson.com/image/i/products/1/3.jpg',
                'https://dummyjson.com/image/i/products/1/4.jpg',
                'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
            ],
        },
        {
            id: 2,
            title: 'iPhone X',
            description:
                'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
            price: 899,
            discountPercentage: 17.94,
            rating: 4.44,
            stock: 34,
            brand: 'Apple',
            category: 'smartphones',
            thumbnail: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
            images: [
                'https://dummyjson.com/image/i/products/2/1.jpg',
                'https://dummyjson.com/image/i/products/2/2.jpg',
                'https://dummyjson.com/image/i/products/2/3.jpg',
                'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
            ],
        },
    ],
    total: 100,
    skip: 0,
    limit: 3,
};
class MockProductService {
    products$$ = new BehaviorSubject<Product[]>([]);
    products$: Observable<Product[]> = this.products$$;
    constructor() { }
    getAll = () => {
        this.products$$.next(mockData.products as Product[]);
    };
    addProduct(product: Product) {
        const products = this.products$$.getValue();
        products.push(...[product]);
        this.products$$.next([...products]);
    }
    searchProducts = (query: string) => {
        const products = this.products$$.getValue();
        const response = products.filter(product => product.title.includes(query));
        this.products$$.next(response);
    };
}

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [{ provide: ProductService, useClass: MockProductService }],
        }).compileComponents();
        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpMock.verify();
    });

    it('should create product service', () => {
        expect(service).toBeTruthy();
    });

    it('should have a function to getAll products', () => {
        expect(service.getAll).toBeTruthy();
    });

    it('should have a function to add products', () => {
        expect(service.addProduct).toBeTruthy();
    });

    it('should get the list of products', async () => {
        jest.spyOn(service, 'getAll');
        service.getAll();
        service.products$.subscribe({
            next: (response) => {
                expect(response).toBeTruthy();
                expect(response.length > 0).toBeTruthy();
                expect(response[0].id).toEqual(1);
            },
        });
    });

    it('should add new product to the existing list of products', fakeAsync(() => {
        service.getAll();
        tick(500)
        const samplePayload: Partial<Product> = {
            title: 'Windows Phone',
            description:
                'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
            price: 899,
            discountPercentage: 17.94,
            rating: 4.44,
            stock: 34,
            brand: 'Microsoft',
            category: 'smartphones',
            thumbnail: 'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
            images: [
                'https://dummyjson.com/image/i/products/2/1.jpg',
                'https://dummyjson.com/image/i/products/2/2.jpg',
                'https://dummyjson.com/image/i/products/2/3.jpg',
                'https://dummyjson.com/image/i/products/2/thumbnail.jpg',
            ],
        };
        service.addProduct(samplePayload as Product);
        tick(1000);
        service.products$.subscribe((response) => {
            const newProduct = response.filter(product => product.title === 'Windows Phone');
            expect(newProduct[0].title).toEqual(samplePayload.title);
        });
        flush();
    }));

    it('should fetch search results of search query', fakeAsync(() => {
        const searchTerm = 'iPhone X';
        service.getAll();
        expect(service.searchProducts).toBeDefined();
        jest.spyOn(service, 'searchProducts');
        service.searchProducts(searchTerm);
        expect(service.searchProducts).toBeCalledWith(searchTerm);
        tick(1000);
        service.products$.subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response.length).toBeGreaterThan(0);
            expect(response[0].title).toEqual(searchTerm);
        })
        flush();
    }));
});
