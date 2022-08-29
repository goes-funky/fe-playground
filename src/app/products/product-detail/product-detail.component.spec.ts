import {FormBuilder} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    MAT_BOTTOM_SHEET_DATA,
    MatBottomSheetModule,
    MatBottomSheetRef
} from '@angular/material/bottom-sheet';

import {ProductDetailComponent} from './product-detail.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const unitConf = {
    declarations: [ProductDetailComponent],
    imports: [HttpClientTestingModule, BrowserAnimationsModule, MatBottomSheetModule],
    providers: [FormBuilder,
        {provide: MatBottomSheetRef, useValue: {}},
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: {id: 1}}
    ],
    schemas: [NO_ERRORS_SCHEMA],
}

const setupComponent = () => {
    let component: ProductDetailComponent;
    let fixture: ComponentFixture<ProductDetailComponent>;
    TestBed.compileComponents().then();
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return component
}

describe('ProductDetailComponent', () => {
    let component: ProductDetailComponent
    beforeEach(async () => {
        await TestBed.configureTestingModule(unitConf).compileComponents();
    });

    afterEach(() => {
        component = setupComponent()
    })


    it('should create', () => {
        component = setupComponent()
        expect(component).toBeTruthy();
    });

    it('onInit test case1: when product have not value we are in add mode', () => {
        const product = {
            id: null,
            title: '',
        };
        TestBed.overrideProvider(MAT_BOTTOM_SHEET_DATA, {useValue: product});
        const component = setupComponent()
        component.form.patchValue = jest.fn();
        component.ngOnInit();
        expect(component.form.patchValue).not.toHaveBeenCalled()
        expect(component.form.value.id).toEqual(product.id)
    });

    it('cancel method: when user dismissed bottomSheet', () => {
        const castComponent = component as any
        castComponent.bottomSheetRef.dismiss = jest.fn();
        component.cancel();
        expect(castComponent.bottomSheetRef.dismiss).toHaveBeenCalled()
    });

    it('submit method: when user submitted form', () => {
        const castComponent = component as any
        castComponent.bottomSheetRef.dismiss = jest.fn();
        component.submit();
        expect(castComponent.bottomSheetRef.dismiss).toHaveBeenCalledWith(component.form.value)
    });

});

describe('ProductDetailComponent With value', () => {

    beforeEach(() => {
        TestBed.configureTestingModule(unitConf);
    });
    it('onInit test case2: when product have not value we are in edit mode', () => {
        const component = setupComponent()
        component.form.patchValue = jest.fn();
        component.ngOnInit();
        expect(component.form.patchValue).toHaveBeenCalled()
        expect(component.form.value.id).toEqual(1)
    });

});
