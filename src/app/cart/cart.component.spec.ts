import { CartService } from './cart.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { CartComponent } from './cart.component';
import { Product } from '../products/product-http.service';
import { By } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
      ],
      declarations: [CartComponent],
      providers: [CartService],
    }).compileComponents();
  });

  beforeEach(() => {
    cartService = TestBed.inject(CartService);
    cartService.add({id: 1, title: 'Test 1'} as Product);
    cartService.add({id: 2, title: 'Test 2'} as Product);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two items', () => {
    const items = fixture.debugElement.queryAll(By.css('.item'));
    expect(items.length).toBe(3);
  });

  it('should change count of product', fakeAsync(() => {
    const items = fixture.debugElement.queryAll(By.css('.item'));
    const countInput = items[items.length - 1].query(By.css('.count input')).nativeElement;
    countInput.value = 6;
    countInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);
    cartService.items$.subscribe(products => {
        expect(products[products.length-1].count).toBe(6);
    })
    tick();
  }));

  it('should remove item from list', fakeAsync(() => {
    const items = fixture.debugElement.queryAll(By.css('.item'));
    const removeButton = items[items.length - 1].query(By.css('.remove button')).nativeElement;
    removeButton.click()
    fixture.detectChanges();
    tick();
    const newIitems = fixture.debugElement.queryAll(By.css('.item'));
    expect(newIitems.length).toBe(2);
  }));

  it('should remove all elements from list and show no items text', fakeAsync(() => {
    const [clearButton] = fixture.debugElement.queryAll(By.css('.controls button'));
    clearButton.nativeElement.click()
    fixture.detectChanges();
    tick();
    const newIitems = fixture.debugElement.queryAll(By.css('.item'));
    expect(newIitems.length).toBe(0);
    expect(fixture.debugElement.query(By.css('.empty-text'))).not.toBeNull();
  }));
});
