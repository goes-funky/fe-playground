import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductListComponent } from './product-list.component';
import { TimerComponent } from './timer/timer.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent, ProductDetailComponent, TimerComponent ],
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        MatBottomSheetModule,
        MatProgressSpinnerModule,
        ProductDetailModule,
        AgGridModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the bottomsheet display method on button press', () => {
    const theSpy = jest.spyOn(component, 'addProduct');
 
    const button = <HTMLElement>document.getElementById('t-addProduct');
    const mouseEvent = new MouseEvent('click');
    
    button.dispatchEvent(mouseEvent);
    fixture.detectChanges();
  
    expect(theSpy).toHaveBeenCalled();
  });

  it('should show the bottomsheet on button press', () => {
    const button = <HTMLElement>document.getElementById('t-addProduct');
    const mouseEvent = new MouseEvent('click');
    
    button.dispatchEvent(mouseEvent);
    fixture.detectChanges();
 
    const bottomSheet = document.getElementsByTagName(
      'mat-bottom-sheet-container'
    );
 
    expect(bottomSheet).toBeTruthy();
  });

  it('should call the update filter method on search input typing', () => {
    const theSpy = jest.spyOn(component, 'searchChanged');
 
    const search = fixture.debugElement.query(By.css('#t-search'));
    const inputEvent = new InputEvent('input');
    const searchValue = 'qww';
    
    search.nativeElement.value = searchValue;
    search.nativeElement.dispatchEvent(inputEvent);
  
    fixture.detectChanges();
    expect(theSpy).toHaveBeenCalledWith(searchValue);
  });
});
