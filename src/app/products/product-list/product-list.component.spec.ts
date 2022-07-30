import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockService } from 'ng-mocks';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { ProductListComponent } from './product-list.component';

describe(ProductListComponent.name, () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ProductListComponent],
            providers: [{
                provide: ProductService, useValue: MockService(ProductService, {
                    getAll: () => new Observable()
                })
            },
            { provide: MatBottomSheet, useValue: {} }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should open details dialog on add product click', () => {
        const addProductButtonDebugElement = fixture.debugElement.query(By.css('#addProductButton'));
        const addProductButtonElement = addProductButtonDebugElement.nativeElement;
        jest.spyOn(component, 'onAddProduct');
        addProductButtonElement.click();
        expect(component.onAddProduct).toHaveBeenCalled();
    });
    it('should search when test is entered to search box', () => {
        const addProductButtonDebugElement = fixture.debugElement.query(By.css('#searchProductInput'));
        const addProductButtonElement = addProductButtonDebugElement.nativeElement;
        jest.spyOn(component, 'searchProducts');
        addProductButtonElement.value='test';
        addProductButtonElement.dispatchEvent(new Event('keyup'));
        expect(component.searchProducts).toHaveBeenCalled();
    });
});
