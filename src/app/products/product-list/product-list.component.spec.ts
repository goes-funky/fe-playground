import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';

describe(ProductListComponent.name, () => { 
  let component: ProductListComponent;
  component=TestBed.inject(ProductListComponent)
  it('search product method should work', () => {
    expect(component.searchProduct).toBe(jasmine.any(Function));
  });
});
