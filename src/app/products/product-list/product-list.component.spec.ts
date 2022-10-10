import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import {ProductService} from '../../services/product.service';
import {HttpClientModule} from '@angular/common/http';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import * as ProductsData from '../../../mocks/products.json'
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('ProductListComponent Tests', () => {
    let productListComponent: ProductListComponent;
    let productService: ProductService;
    let matBottomSheet: MatBottomSheet;
    let fixture: ComponentFixture<ProductListComponent>;
    let tableElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientModule,
                MatBottomSheetModule,
                MatProgressSpinnerModule,
                AgGridModule,
                FormsModule,
                MatIconModule],
            declarations: [ProductListComponent],
            providers: [ProductService,
                MatBottomSheet],
        }).compileComponents();
    });

    beforeEach(() => {
        productService = TestBed.inject(ProductService);
        matBottomSheet = TestBed.inject(MatBottomSheet);
        fixture = TestBed.createComponent(ProductListComponent);
        tableElement = fixture.nativeElement;
        productListComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component and should call service method', () => {
        jest.spyOn(productService, 'getAll').mock;
        productListComponent.ngOnInit();
        expect(productListComponent).toBeTruthy();
        expect(productService.getAll).toHaveBeenCalled();
    });

    it('should open a bottom sheet component when a product is added', () => {
        jest.spyOn(matBottomSheet, 'open').mock;
        productListComponent.ngOnInit();
        productListComponent.addProduct();
        expect(matBottomSheet.open).toHaveBeenCalledWith(ProductDetailComponent);
    });

    it('should call the search api when a filter is applied', waitForAsync( () => {
        jest.spyOn(productService, 'getAll').mockReturnValue(of(ProductsData.getAll));
        jest.spyOn(productService, 'searchProduct').mock;
        productListComponent.ngOnInit();
        productListComponent.applyFilter('hello');
        expect(productService.searchProduct).toHaveBeenCalled();
    }));

    it('should not call the search api when the length of entered value is less than 2', waitForAsync( () => {
        jest.spyOn(productService, 'getAll').mockReturnValue(of(ProductsData.getAll));
        jest.spyOn(productService, 'searchProduct').mock;
        productListComponent.ngOnInit();
        productListComponent.applyFilter('he');
        expect(productService.searchProduct).not.toHaveBeenCalled();
    }));

    it('should clear the searched value when clear is clicked', () => {
        jest.spyOn(productService, 'getAll').mock;
        productListComponent.clearSearch();
        expect(productListComponent.searchValue).toEqual('');
        expect(productService.getAll).toHaveBeenCalled();
    });
});
