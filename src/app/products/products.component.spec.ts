import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    const matBottomSheetStub = () => ({ dismiss: () => ({}) });
    const productHttpServiceStub = () => ({
      products$$: { next: () => ({}) },
     });
    const productServiceStub = () => ({
      products$$: { next: () => ({}) },

    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductsComponent],
      providers: [
        { provide: MatBottomSheet, useFactory: matBottomSheetStub },
        { provide: ProductHttpService, useFactory: productHttpServiceStub },
        { provide: ProductService, useFactory: productServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });


});
