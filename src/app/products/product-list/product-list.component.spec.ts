import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { of } from 'rxjs';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock: any;
  let productsMock: Product[] = [
   {
     "id": 1,
     "title": "iPhone 9",
     "description": "An apple mobile which is nothing like apple",
     "price": 549,
     "discountPercentage": 12.96,
     "rating": 4.69,
     "stock": 94,
     "brand": "Apple",
     "category": "smartphones",
     "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
     "images": [
       "https://dummyjson.com/image/i/products/1/1.jpg",
       "https://dummyjson.com/image/i/products/1/2.jpg",
       "https://dummyjson.com/image/i/products/1/3.jpg",
       "https://dummyjson.com/image/i/products/1/4.jpg",
       "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
     ]
   }
 ];
 let bottomSheet: MatBottomSheet;

  beforeEach((() => {
    productServiceMock = {
      getAll: jest.fn(),
      searchByString: jest.fn(),
      addProduct: jest.fn()
    };
    
    productServiceMock.getAll.mockReturnValue(of([...productsMock]));

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AgGridModule,
        MatProgressSpinnerModule,
        MatBottomSheetModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        ProductDetailModule,
        NoopAnimationsModule,
      ],
      declarations: [ProductListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: ProductService,
        useValue: productServiceMock,
      }]
    }).compileComponents();
      
   fixture = TestBed.createComponent(ProductListComponent);
   bottomSheet = TestBed.inject(MatBottomSheet);
   component = fixture.componentInstance;
   fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  describe('on init', () => {
   it('getAll() should be called', () => {
      expect(productServiceMock.getAll).toBeCalledTimes(1);
   });
   
   it('should be created', () => {
      // Arrange
      const searchFormControlSpy = jest.spyOn(component.searchFormControl['valueChanges'], 'subscribe');
      
      // Act
      component.ngOnInit();
      
      // Assert
      expect(searchFormControlSpy).toBeCalledTimes(1);
   });
  });
  
  it('should call bottomSheetOpen when addProduct is called', async () => {
      // Arrange
      const bottomSheetOpenSpy = jest.spyOn(bottomSheet, 'open');
      
      // Act
      component.addProduct();

      // Assert
      expect(bottomSheetOpenSpy).toBeCalledTimes(1);
   });
});