import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {ProductListComponent} from "./product-list.component";
import {ProductService} from "../product.service";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {AgGridModule} from "ag-grid-angular";
import { Product } from '../product-http.service'



describe('ProductListComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatBottomSheetModule,
                AgGridModule
            ],
            declarations: [
                ProductListComponent
            ],
            providers : [
                ProductService
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(ProductListComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        const fixture = TestBed.createComponent(ProductListComponent);
        const component = fixture.debugElement.componentInstance;
        const service = fixture.debugElement.injector.get(ProductService);
        component.ngOnInit();
        component.products$.subscribe((x:  Product[]) => {
            expect(x).toEqual([])
        })
    })
});
