import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product-services/product.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe(ProductListComponent.name, () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
            ],
            declarations: [ProductListComponent],
            providers: [ProductService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create product-list component', () => {
        expect(component).toBeTruthy();
    });

    it('should have function to addProducts', () => {
        expect(component.onAddProduct).toBeTruthy();
    });

    it('should create the product service', () => {
        const service: ProductService = TestBed.get(ProductService);
        expect(service).toBeTruthy();
    });

    it('should have a function to addProducts in the product service', () => {
        const service: ProductService = TestBed.get(ProductService);
        expect(service.addProduct).toBeTruthy();
    });

    it('should the function to add products when the plus button is clicked', async () => {
        jest.spyOn(component, 'onAddProduct');
        const button = fixture.debugElement.nativeElement.querySelector('#add-btn');
        if (button) {
            button.click();
        };
        expect(component.onAddProduct).toHaveBeenCalled();
    });

    it('should have a function dynamically search the api for products', async () => {
        const service: ProductService = TestBed.get(ProductService);
        expect(service.searchProducts).toBeTruthy();
    });

    // it('should dynamically search when the input value changes', async () => {
    //     const service: ProductService = TestBed.get(ProductService);
    //     jest.spyOn(service, 'searchProducts');
    //     component.searchCtrl.setValue('phone');
    //     await fixture.whenStable();
    //     expect(service.searchProducts).toHaveBeenNthCalledWith(1, 'phone');
    // });

    it('should returns a search result when the input value changes', async () => {
        const service: ProductService = TestBed.get(ProductService);
        const response = service.searchProducts('phone');
        expect(response).toBeTruthy();
    });
});
