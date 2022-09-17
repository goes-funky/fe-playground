import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product-services/product.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductListModule } from './product-list.module';
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
    ],
    total: 100,
    skip: 0,
    limit: 2,
};
class MockProductService {
    getAll = () => of(mockData);
    searchProducts = (query: string) => of([query]) as Observable<any>;
}

describe(ProductListComponent.name, () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let element: HTMLElement;
    let mockService: MockProductService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                NoopAnimationsModule,
                HttpClientModule,
                HttpClientTestingModule,
                ProductListModule,
            ],
            declarations: [ProductListComponent],
            providers: [
                {
                    provide: ProductService,
                    useClass: MockProductService,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        // UserService provided to the TestBed
        mockService = TestBed.inject(ProductService);
        element = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    /* New Add Product and Search Feature Component Unit Test */
    it('should have a function to add products to the list', () => {
        expect(component.onAddProduct).toBeTruthy();
    });

    it('should have a search products function to enable search features', () => {
        expect(component.searchProducts).toBeTruthy();
    });

    it('clicking on the plus icon should call the add product function', () => {
        jest.spyOn(component, 'onAddProduct');
        const button = fixture.debugElement.nativeElement.querySelector('#add-btn');
        expect(button).toBeTruthy();
        button.click();
        expect(component.onAddProduct).toHaveBeenCalled();
    });

    it('should call search products service with the value of the search field when the input changes', fakeAsync(() => {
        const searchTerm = 'iphone';
        const spy = jest.spyOn(mockService, 'searchProducts');
        component.searchCtrl.setValue(searchTerm);
        tick(500);
        expect(spy).toHaveBeenNthCalledWith(1, searchTerm);
        flush();
    }));
});
