import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductEditFacade } from './product-edit.facade';
import { ProductService } from './product.service';

@Component({
  selector: 'y42-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  constructor(private readonly productEditFacade: ProductEditFacade, private readonly productService: ProductService) {}

  public createNewProduct(): void {
    this.productEditFacade.createProduct().subscribe();
  }


  public onSearch(value: string): void {
    this.productService.getAll({ search: value })
  }
}
