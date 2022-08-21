import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProductFilterComponent } from './product-filter.component';
import { AngularMaterialModule } from '../app/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularMaterialModule
      ],
      providers: [
        { provide: MatBottomSheetRef, useValue: {} },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
      ],
      declarations: [ProductFilterComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if filter input exist', () => {
    const filterInput = fixture.debugElement.nativeElement.querySelector('#filter-input');
    expect(filterInput).toBeTruthy();
  });

  it('should check if filter button exist', () => {
    const filterButtonElement = fixture.debugElement.nativeElement.querySelector('#filter-button');
    expect(filterButtonElement).toBeTruthy();
    expect(filterButtonElement.textContent).toBe('Search');
  });

  it('should check if last request text exist', () => {
    const lastRequestElement = fixture.debugElement.nativeElement.querySelector('#last-request-text');
    expect(lastRequestElement).toBeTruthy();
    expect(lastRequestElement.textContent.includes('Last update') && lastRequestElement.textContent.includes('seconds ago.')).toBeTruthy();
  });
});
