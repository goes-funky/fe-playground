import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { ProductService } from '../product.service';
import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(() => {
  
    const matBottomSheetRefStub = () => ({ dismiss: () => ({}) });
   
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductListComponent],
      imports: [HttpClientModule, MatBottomSheetModule],
      providers: [
        { provide: MatBottomSheet, useFactory: matBottomSheetRefStub },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
 

  describe('openProduct', () => {
    it('makes expected calls', () => {
      const matBottomSheetStub: MatBottomSheet = fixture.debugElement.injector.get(
        MatBottomSheet
      );
      const rowDoubleClickedEventStub: RowDoubleClickedEvent = <any>{};
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );
      component.openProduct(rowDoubleClickedEventStub);
      
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const productServiceStub: ProductService = fixture.debugElement.injector.get(
        ProductService
      );

      component.ngOnInit();

    });
  });
});
