import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgGridModule } from 'ag-grid-angular';

import { ProductService } from './../product.service';
import { ProductListComponent } from './product-list.component';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { By } from '@angular/platform-browser';


describe('ProductList', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
        AgGridModule,
        MatProgressSpinnerModule,
        MatBottomSheetModule,
        ProductDetailModule,
        MatInputModule,
      ],
      declarations: [ProductListComponent],
      providers: [ProductService],
    }).compileComponents();
  });

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
    jest.spyOn(productService, 'search').mockImplementation();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start search', fakeAsync(() => {
    jest.spyOn(component, 'search');
    jest.spyOn(component.search$, 'next');
    const inputSearch = fixture.debugElement.query(By.css('.search input')).nativeElement;
    inputSearch.value = 'test';
    inputSearch.dispatchEvent(new Event('input'));
    fixture.detectChanges()
    expect(component.search).toBeCalled();
    expect(component.search$.next).toBeCalled();
  }));
});
