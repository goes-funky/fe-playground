import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ProductHttpService } from '../../services/product-http.service';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

describe('ProductDetailComponent Tests', () => {
    let productDetailComponent: ProductDetailComponent;
    let matBottomSheet: MatBottomSheet;
    let fixture: ComponentFixture<ProductDetailComponent>;
    let mockBottomSheet = {
        open: jest.mock('open')};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule,
                HttpClientModule,
                MatBottomSheetModule,
                MatProgressSpinnerModule,
                AgGridModule,
                FormsModule,
                MatIconModule,
                MatCardModule,
                MatButtonModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MatFormFieldModule,
                MatInputModule,
                MatBottomSheetModule],
            declarations: [ProductDetailComponent],
            providers: [
                MatBottomSheet,
                { provide: MatBottomSheetRef, useValue: mockBottomSheet },
                { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        matBottomSheet = TestBed.inject(MatBottomSheet);
        fixture = TestBed.createComponent(ProductDetailComponent);
        productDetailComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component and should call service method', () => {
        productDetailComponent.ngOnInit();
        expect(productDetailComponent).toBeTruthy();
    });
});
