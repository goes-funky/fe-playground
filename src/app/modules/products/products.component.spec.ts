import { ProductsComponent } from './products.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MockComponent, MockModule } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { Product } from "../../common/interfaces/product.interface";
import { ProductService } from "../../common/services/product.service";
import { render } from '@testing-library/angular';
import { byTestId, byText } from 'testing-library-selector';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let productService: Partial<ProductService>;
    let bottomSheet: MatBottomSheet;

    const productsInstance = {
        addProductButton: byText('Add New Product'),
        lastUpdateSeconds: byTestId('last-update-in-seconds'),
    };

    beforeEach(async () => {
        productService = {
            lastFetchedMoment$$: new BehaviorSubject(0),
        };
        const renderedComponent = await render(ProductsComponent, {
                declarations: [MockComponent(ProductDetailComponent)],
                imports: [
                    CommonModule,
                    MockModule(MatButtonModule),
                    MatBottomSheetModule,
                    RouterTestingModule,
                ],
                providers: [
                    {provide: ProductService, useValue: productService},
                ]
            });
        component = renderedComponent.fixture.componentInstance;
        fixture = renderedComponent.fixture;
        bottomSheet = TestBed.inject(MatBottomSheet);
        });


    it('should render', () => {
        expect(component).toBeTruthy();
    });

    it('Should initialise the rendering of  lastFetchedMoment',() => {
        fixture.detectChanges();
        expect(productsInstance.lastUpdateSeconds.query()).toBeInTheDocument();
        expect(productsInstance.lastUpdateSeconds.query()).toHaveTextContent('Last fetch was done 0 seconds ago');
        const newValue = 60;
        (productService.lastFetchedMoment$$ as BehaviorSubject<number>).next(newValue);
        fixture.detectChanges();
        expect(productsInstance.lastUpdateSeconds.query()).toHaveTextContent(`Last fetch was done ${newValue} seconds ago`)

    });

    it('Should open the bottomSheet on the AddProduct Button Click', async () => {
        fixture.detectChanges();
        const initialProduct = {} as Product
        const dialogBottomSheet = jest.spyOn(bottomSheet, 'open');
        expect(dialogBottomSheet).not.toHaveBeenCalled();
        expect(productsInstance.addProductButton.query()).toBeInTheDocument();
        const user = userEvent.setup();
        await user.click(productsInstance.addProductButton.get());
        expect(dialogBottomSheet).toHaveBeenCalledWith(ProductDetailComponent, { data: initialProduct });
    });

});