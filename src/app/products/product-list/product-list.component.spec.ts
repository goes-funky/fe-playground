import {of} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    MAT_BOTTOM_SHEET_DATA, MatBottomSheet,
    MatBottomSheetModule,
    MatBottomSheetRef
} from '@angular/material/bottom-sheet';
import {RowDoubleClickedEvent} from "ag-grid-community";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {mockedData} from "./mock-data";
import {ProductService} from "../product.service";
import {ProductListComponent} from './product-list.component';
import {Product, ProductPagingResponse} from "../product-http.service";


const unitConf = {
    declarations: [ProductListComponent],
    imports: [HttpClientTestingModule, BrowserAnimationsModule, MatBottomSheetModule],
    providers: [FormBuilder, ProductService,
        {provide: MatBottomSheetRef, useValue: {}},
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: {id: 1}},
        {
            provide: MatBottomSheet, useValue: {}
        }
    ],
    schemas: [NO_ERRORS_SCHEMA],
}

describe('ProductListComponent', () => {
    let component: ProductListComponent
    let fixture: ComponentFixture<ProductListComponent>;
    let service: ProductService


    beforeEach(async () => {
        await TestBed.configureTestingModule(unitConf).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ProductService)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test onInit: get product list', () => {
        service.getAll = jest.fn(() => of(mockedData));
        const castComponent = component as any
        castComponent._resetToCurrentTime = jest.fn();
        castComponent._getCurrentTimeSeconds = jest.fn();
        const gottenValue: any[] = [];
        component.ngOnInit()
        service.getAll().subscribe({
            next: (res) => {
                gottenValue.push(res.products);
            },
            error: () => {
                gottenValue.push('error');
            },
            complete: () => {
                gottenValue.push('complete');
            },
        });
        expect(gottenValue).toEqual([mockedData.products, 'complete']);
        expect(castComponent._resetToCurrentTime).toHaveBeenCalled();
        // search param change checking
        expect(castComponent._getCurrentTimeSeconds).not.toHaveBeenCalled()
        expect(component.seconds).toEqual(0)
    });

    it('should test onInit: change search key', () => {
        const searchKey = 'iPho';
        const search = new RegExp(searchKey, 'i');
        let gottenValues: ProductPagingResponse = {} as ProductPagingResponse;
        const filteredData = mockedData.products.filter(pro => search.test(pro.title))
        service.searchProduct = jest.fn();
        service.getAll = jest.fn(() => of({
            skip: 0,
            limit: filteredData.length,
            products: filteredData,
            total: mockedData.total
        }));

        service.getAll().subscribe(res => {
            gottenValues = res;
        })
        component.searchKey.setValue(searchKey)

        expect(service.searchProduct).toHaveBeenCalledWith(component.searchKey.value)
        expect(gottenValues.products.length).toEqual(2);
    });

    it('Clear filter', () => {
        component.searchKey.setValue('saeed');
        service.getAll = jest.fn(() => of(mockedData));
        component.clearFilter();
        expect(component.searchKey.value).toEqual(null);
        expect(service.getAll).toHaveBeenCalled();
    })

    it('Edit Product', () => {
        const mockMessageBus = {
            afterDismissed: jest.fn(() => of(selectedProduct)),
        };
        const selectedProduct = mockedData.products[0];
        (component as any).bottomSheet.open = jest.fn().mockReturnValue(mockMessageBus)
        component.editProduct({
            event: {target: fixture.nativeElement},
            data: selectedProduct
        } as RowDoubleClickedEvent);
        selectedProduct.title = 'xiaomi';
        expect((component as any).bottomSheet.open).toHaveBeenCalled();
        service.updateProduct(selectedProduct.id, selectedProduct);
    })


    it('Add Product', () => {
        const newProduct = {
            id: null,
            title: 'xiaomi',
            description: '',
            price: 100,
            discountPercentage: 1,
            rating: 1,
            stock: 1,
            brand: 'mi',
            category: '',
            thumbnail: '',
            images: ['']
        } as unknown as Product;
        const mockMessageBus = {
            afterDismissed: jest.fn(() => of()),
        };
        (component as any).bottomSheet.open = jest.fn().mockReturnValue(mockMessageBus)
        component.addProduct();
        expect((component as any).bottomSheet.open).toHaveBeenCalled();
        service.addProduct(newProduct);
    })
});
