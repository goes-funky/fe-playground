import { ProductService } from './../product.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of, throwError } from 'rxjs';
import { Product } from '../product-http.service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
export class MatBottomSheetMock {
  open() {
   return {
    afterDismissed: () => of(true)
   };
 }
}

describe(ProductListComponent.name, () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let bottomSheet:MatBottomSheetMock = new MatBottomSheetMock()
  let searchProducts = {
    "products": [
      {
        "id": 12,
        "title": "Brown Perfumesssss",
        "description": "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
        "price": 40,
        "discountPercentage": 15.66,
        "rating": 4,
        "stock": 52,
        "brand": "Royal_Mirage",
        "category": "fragrances",
        "thumbnail": "https://dummyjson.com/image/i/products/12/thumbnail.jpg",
        "images": [
          "https://dummyjson.com/image/i/products/12/1.jpg",
          "https://dummyjson.com/image/i/products/12/2.jpg",
          "https://dummyjson.com/image/i/products/12/3.png",
          "https://dummyjson.com/image/i/products/12/4.jpg",
          "https://dummyjson.com/image/i/products/12/thumbnail.jpg"
        ]
      }
    ],
    "total": 1,
    "skip": 0,
    "limit": 1
  };
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        AgGridModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatProgressSpinnerModule,
        MatBottomSheetModule
    ],
      declarations: [ProductListComponent],
      providers: [ { provide: MatBottomSheet, useValue: bottomSheet}, ProductService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService= TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test applySearch() function' , fakeAsync( ()=>  {
      component.searchControl.setValue('Brown Perfume');
      const addSpy = jest.spyOn(productService, 'searchProducts').mockReturnValue(of(searchProducts) as any);
      component.applySearch();
      tick(1000);
      expect(addSpy).toHaveBeenCalledTimes(1);
  }));

   it('should test addProduct() function' , ()=>  {
      const spy = jest.spyOn(bottomSheet, 'open');
      const addProductSpy = jest.spyOn(productService, 'addProduct').mockReturnValue(of(searchProducts) as any);
      component.addProduct();
      expect(addProductSpy).toHaveBeenCalledTimes(1);
  });

});


