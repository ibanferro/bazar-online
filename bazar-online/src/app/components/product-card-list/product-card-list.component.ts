import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss'
})
export class ProductCardListComponent {
  public productList: Product[] = [];

  constructor(
    private productService: ProductService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
      console.log('ProductCardListComponent constructor');
      console.log("Actiavted Route: ", this.activatedRoute.snapshot.params);
      const searchText: string = this.activatedRoute.snapshot.params['query'];

      console.log('Search Text: ', searchText);
      this.productService.getFilteredProducts(searchText).subscribe(
        (products: Product[]) => {
          console.log('Products: ', products);
          this.productList = products;
          this.changeDetector.markForCheck();

        }
      );

    }

  selectProductId( product: Product ): void {
    this.router.navigate(['/items', product.id]);
  }

}
