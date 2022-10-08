import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from '../ui/search/search.component';
import { ProductEditFacade } from './product-edit.facade';
import { ProductService } from './product.service';
import { ProductsComponent } from './products.component';
import { of } from 'rxjs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatBottomSheetModule,
        HttpClientTestingModule,
        SearchComponent,
      ],
      declarations: [ProductsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create Product method when user click button', () => {
    jest.spyOn(ProductEditFacade.prototype, 'createProduct').mockImplementation(() => of());

    fixture.nativeElement.querySelector('.header button').click();

    expect(ProductEditFacade.prototype.createProduct).toBeCalled();
  });

  it('should call getAll function with search pattern when search component emit value', () => {
    jest.spyOn(ProductService.prototype, 'getAll').mockImplementation(() => of());
    const input = 'y42'

    fixture.debugElement.query(By.css('y42-search')).componentInstance.search.emit(input);

    expect(ProductService.prototype.getAll).toBeCalledWith({ search: input });
  });
});
