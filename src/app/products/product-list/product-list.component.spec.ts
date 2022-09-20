import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AgGridModule } from 'ag-grid-angular';
import { MockComponents } from 'ng-mocks';
import { Observable, Observer, of } from 'rxjs';
import { SearchComponent } from '../../shared/search/search.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product-http.service';
import { ProductService } from '../product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const mockProducts: Product[] = [
    {
      id: 0,
      title: 'First Product',
      description: 'First Product',
      price: 10,
      discountPercentage: 10,
      brand: 'B1',
      category: 'Test',
      images: [],
      rating: 4.4,
      stock: 100,
      thumbnail: '',
    },
  ];

  class MockProductService {
    getAll() {
      return new Observable((observer: Observer<Product[]>) => {
        observer.next(mockProducts);
      });
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, MockComponents(ProductDetailComponent, SearchComponent)],
      imports: [HttpClientTestingModule, MatBottomSheetModule, AgGridModule],
      providers: [{ provide: ProductService, useClass: MockProductService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
