import { byTestId, byText } from 'testing-library-selector';
import { render } from '@testing-library/angular';
import { ProductsComponent } from './products.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MockComponent, MockModule } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from './services';
import { BehaviorSubject, of } from 'rxjs';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Product } from './models';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import userEvent from '@testing-library/user-event';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let rerender: (props: Partial<ProductsComponent>) => void;
  let productService: Partial<ProductService>;
  let bottomSheet: MatBottomSheet;

  const ui = {
    addProduct: byText('+ Add Product'),
    fetchCounter: byTestId('fetch-counter'),
  };

  beforeEach(async () => {
    productService = {
      lastUpdatedSec$: new BehaviorSubject(0),
      addProduct: (product) => of()
    };
    const result = await render(ProductsComponent, {
      declarations: [MockComponent(ProductDetailComponent)],
      imports: [
        CommonModule,
        MockModule(MatButtonModule),
        MatBottomSheetModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: productService }
      ]
    });
    rerender = result.rerender;
    component = result.fixture.componentInstance;
    fixture = result.fixture;
    bottomSheet = TestBed.inject(MatBottomSheet);
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render lastFetchSeconds', () => {
    expect(ui.fetchCounter.query()).toBeInTheDocument();
    expect(ui.fetchCounter.query()).toHaveTextContent('Fetched 0 seconds ago');
    const newValue = 60;
    (productService.lastUpdatedSec$ as BehaviorSubject<number>).next(newValue);
    fixture.detectChanges();
    expect(ui.fetchCounter.query()).toHaveTextContent(`Fetched ${newValue} seconds ago`);
  });

  it('should render bottom sheet with ProductDetailsComponent on Add Product button click', async () => {
    const emptyProduct: Product = {
      id: 1,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: [],
    };

    const bottomSheetOpenSpy = jest.spyOn(bottomSheet, 'open');
    expect(bottomSheetOpenSpy).not.toHaveBeenCalled();
    expect(ui.addProduct.query()).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(ui.addProduct.get());
    expect(bottomSheetOpenSpy).toHaveBeenCalledWith(ProductDetailComponent, { data: emptyProduct });
  });

  // it('should call product service addProduct method on form submit', fakeAsync(async () => {
  //   const emptyProduct: Product = {
  //     id: 1,
  //     title: '',
  //     description: '',
  //     price: 0,
  //     discountPercentage: 0,
  //     rating: 0,
  //     stock: 0,
  //     brand: '',
  //     category: '',
  //     thumbnail: '',
  //     images: [],
  //   };
  //
  //   const addProductSpy = jest.spyOn(productService, 'addProduct');
  //   expect(addProductSpy).not.toHaveBeenCalled();
  //   const user = userEvent.setup();
  //   await user.click(ui.addProduct.get());
  //   bottomSheet.dismiss(emptyProduct);
  //   tick(1000);
  //   expect(addProductSpy).toHaveBeenCalled();
  // }));
});