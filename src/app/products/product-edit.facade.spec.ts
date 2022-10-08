import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { lastValueFrom, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductEditFacade } from './product-edit.facade';
import { ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';

describe('ProductEditFacade', () => {
  let service: ProductEditFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatBottomSheetModule],
      providers: [ProductEditFacade],
    });
  }));

  it('should open modal and if user enter data send the request to backend and emit new products data with the new product', async () => {
    jest.useFakeTimers();
    expect.assertions(3);

    const fakeProduct = { id: 'fakeID', title: 'fake product ' };
    jest.spyOn(MatBottomSheet.prototype, 'open').mockImplementation(
      () =>
        ({
          afterDismissed: () => of(fakeProduct),
        } as any),
    );
    jest.spyOn(ProductHttpService.prototype, 'post').mockImplementation((product) => of(product as Product));
    const productService = TestBed.inject(ProductService);
    service = TestBed.inject(ProductEditFacade);

    service.createProduct().subscribe();

    expect(ProductHttpService.prototype.post).toHaveBeenCalledWith(expect.objectContaining(fakeProduct));
    productService.products$.subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0]).toMatchObject(expect.objectContaining(fakeProduct));
    });

    jest.runAllTimers();
  });
});
