import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { ProductDetailComponent } from './product-detail.component';
import { Product } from '../product-http.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(() => {
    const matBottomSheetRefStub = () => ({ dismiss: () => ({}) });
    const productStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductDetailComponent],
      providers: [
        { provide: MatBottomSheetRef, useFactory: matBottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel', () => {
    it('makes expected calls', () => {
      const matBottomSheetRefStub: MatBottomSheetRef = fixture.debugElement.injector.get(
        MatBottomSheetRef
      );

      component.cancel();

    });
  });

  describe('submit', () => {
    it('makes expected calls', () => {
      const matBottomSheetRefStub: MatBottomSheetRef = fixture.debugElement.injector.get(
        MatBottomSheetRef
      );
      component.submit();

    });
  });
});
