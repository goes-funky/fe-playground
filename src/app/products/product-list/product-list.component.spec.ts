import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { of } from 'rxjs';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductService } from '../product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let serviceMock: any;

  beforeEach(async(() => {
    serviceMock = {
      loading$: of(false),
      search: jest.fn(),
      addProduct: jest.fn(),
      getAll: () => of(),
    };
    serviceMock.search.mockReturnValueOnce(of([]));

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
        useValue: serviceMock,
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 as initial fetchedAgo', (done) => {
    component.fetchedAgo$.subscribe((time) => {
      expect(time).toBe(0);
      done();
    })
  });

  it('should search after user input in search field', fakeAsync(() => {
    component.searchControl.patchValue('test');
    tick(500);
    expect(serviceMock.search.mock.calls.length).toBe(1);
  }));
});
