import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from './product.service';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './product-detail/product-detail.component';

describe(ProductsComponent.name, () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceStub: ProductService;

  beforeEach(async () => {
    productServiceStub = {
      updated$: new BehaviorSubject(Date.now()),
      searchByQuery: jest.fn(),
      addProduct: jest.fn(),
    } as unknown as ProductService;

    await TestBed.configureTestingModule({
      imports: [
        MatBottomSheetModule, MatInputModule, MatButtonModule,
        ReactiveFormsModule, RouterTestingModule, MatFormFieldModule, NoopAnimationsModule,
      ],
      declarations: [ProductsComponent],
      providers: [MatBottomSheet, {
        provide: ProductService,
        useValue: productServiceStub,
      }, { provide: ProductDetailComponent, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component[`initLastUpdate`] = jest.fn();
    component[`initOnSearchListener`] = jest.fn();
    component.ngOnInit();
    expect(component[`initLastUpdate`]).toBeCalled();
    expect(component[`initOnSearchListener`]).toBeCalled();
  });

  it('should initLastUpdate', () => {
    (productServiceStub.updated$ as unknown as BehaviorSubject<number>).next(Date.now() - 2000);
    component[`initLastUpdate`]();
    component.lastUpdated$.subscribe((value) => {
      expect(value).toBe(2)
    })
  });

  it('should initOnSearchListener', fakeAsync(() => {
    const query = 'hello';
    component[`initOnSearchListener`]();
    component.searchControl.setValue(query);
    flush();
    tick(501);
    expect(productServiceStub.searchByQuery).toBeCalledWith(query);
  }));
});
