import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { of } from 'rxjs';

import { ProductService } from "../product.service";
import { ProductListComponent } from "./product-list.component";
import { Product } from '../product-http.service';

describe('Product List', () => {
    let comp: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let productService: ProductService;
    let matBottomSheet: MatBottomSheet;
    let products: Product[] = [{
        id: 101,
        title: 'Mobile phone',
        description: 'Mobile phone description',
        price: 990,
        rating: 4.9,
        stock: 99,
        brand: 'Samsung',
        category: 'mobile',
        discountPercentage: 0,
        thumbnail: '',
        images: ['']
    }];
    let productServiceStub = {
        getAll() {
            return products;
        },
        addProduct(newProduct: Product) {
            products.push(newProduct);
        },
        searchProduct(e: any) {
            return {
                subscribe() {}
            }
        }
    };
    let matBottomSheetStub = {
        open() {
            return matBottomSheetRefStub;
        }
    };
    let matBottomSheetRefStub = {
        afterDismissed() {
            return {
                pipe() {
                    productService.addProduct(products[0]);
                    return {
                        subscribe() {}
                    }
                }
            }
        }
    };
    const searchEvent = {
        target: {
            value: 'mobile'
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProductListComponent,
            ],
            imports: [
                MatBottomSheetModule
            ],
            providers: [
                { provide: ProductService, useValue: productServiceStub },
                { provide: MatBottomSheet, useValue: matBottomSheetStub }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
        comp = fixture.componentInstance;
        productService = fixture.debugElement.injector.get(ProductService);
        matBottomSheet = fixture.debugElement.injector.get(MatBottomSheet);
    });

    it('should call getAllProducts when ngOnInit is called', () => {
        jest.spyOn(comp, 'getAllProducts');
        jest.spyOn(productService, 'getAll').mockReturnValue(of({
            products: products,
            total: 1,
            skip: 0,
            limit: 0
          }));
        comp.ngOnInit();
        expect(comp.getAllProducts).toHaveBeenCalled();
    });

    it('should add new product when addProduct is called', () => {
        jest.spyOn(productService, 'addProduct');
        jest.spyOn(matBottomSheet, 'open');
        comp.addProduct();
        expect(matBottomSheet.open).toHaveBeenCalled();
        expect(productService.addProduct).toHaveBeenCalledWith(products[0]);
    });

    it('should update products when onSearchProduct is called', () => {
        jest.spyOn(productService, 'searchProduct');
        jest.spyOn(comp, 'getAllProducts');
        comp.onSearchProduct(searchEvent);
        expect(productService.searchProduct).toHaveBeenCalledWith(searchEvent.target.value);
        expect(comp.getAllProducts).not.toHaveBeenCalled();
    });

});