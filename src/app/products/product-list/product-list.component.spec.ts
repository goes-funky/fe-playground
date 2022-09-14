import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AgGridModule } from 'ag-grid-angular';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductListComponent } from './product-list.component';
import { ROUTES } from './product-list.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../product-services/product.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductHeaderComponent } from '../product-child-components';
import { SharedModule } from '../../shared/shared.module';

describe(ProductListComponent.name, () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                AgGridModule,
                ReactiveFormsModule,
                MatIconModule,
                SharedModule,
                MatButtonModule,
                MatProgressSpinnerModule,
                MatBottomSheetModule,
                MatButtonModule,
                MatCardModule,
                MatInputModule,
                ProductDetailModule,
                RouterTestingModule,
                HttpClientModule,
                HttpClientTestingModule,
                RouterModule.forChild(ROUTES),
            ],
            declarations: [ProductListComponent, ProductHeaderComponent],
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
