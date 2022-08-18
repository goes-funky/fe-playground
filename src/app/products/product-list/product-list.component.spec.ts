import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AgGridModule } from "ag-grid-angular";
import { MockService } from "ng-mocks";
import { of } from "rxjs";
import { ProductDetailModule } from "../product-detail/product-detail.module";
import { ProductService } from "../product.service";
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    let productServiceMock = MockService(ProductService);
    productServiceMock.getAll = jest.fn(() => of({ products: [], total: 0, skip: 0, limit: 0 }));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListComponent],
            imports: [
                CommonModule,
                AgGridModule,
                MatProgressSpinnerModule,
                MatBottomSheetModule,
                ProductDetailModule,
                RouterTestingModule.withRoutes([
                    {
                        path: '',
                        component: ProductListComponent,
                    },
                ]),
                BrowserAnimationsModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                ReactiveFormsModule,
                MatButtonModule
            ],
            providers: [{ provide: ProductService, useValue: productServiceMock }]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});