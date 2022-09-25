import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {ProductService} from "./product.service";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {AgGridModule} from "ag-grid-angular";
import { Product } from './product-http.service'
import {By} from "@angular/platform-browser";
import {ProductsComponent} from "./products.component";
import {MatFormFieldModule} from "@angular/material/form-field";



describe('ProductsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatBottomSheetModule,
                MatFormFieldModule,
                AgGridModule
            ],
            declarations: [
                ProductsComponent
            ],
            providers : [
                ProductService
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(ProductsComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should identify empty array', () => {
        const fixture = TestBed.createComponent(ProductsComponent);
        const component = fixture.debugElement.componentInstance;
        const service = fixture.debugElement.injector.get(ProductService);
        service.getAll().subscribe(x => {
            expect(x).toEqual({ products: [], total: 0, skip: 0, limit: 0})
        })
    })

    it('should add', () => {
        const fixture = TestBed.createComponent(ProductsComponent);
        const component = fixture.debugElement.componentInstance;
        const service = fixture.debugElement.injector.get(ProductService);
        const newProduct: Partial<Product> = {};
        const inputDebugElement = fixture.debugElement.query(By.css('button'));
        const inputHtmlElement = inputDebugElement.nativeElement as HTMLInputElement;
        inputHtmlElement.dispatchEvent(new Event('click'));
        const spy = jest.spyOn(service, 'addProduct');
        service.addProduct(newProduct)
        expect(spy).toHaveBeenCalledWith(newProduct);
    })
});
