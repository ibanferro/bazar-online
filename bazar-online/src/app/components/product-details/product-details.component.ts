import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../types/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {

  product!: Product;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {

    console.log('ProductDetails constructor');
    console.log("Actiavted Route: ", this.activatedRoute.snapshot.params);

    const searchId: number = this.activatedRoute.snapshot.params['id'];

    console.log('Search Id: ', searchId);
    this.productService.getProductById(searchId).subscribe(
      (product: Product | null) => {
        if(!product) return;
        console.log('Product: ', product)
        this.product = product;
        this.changeDetector.markForCheck();
      }
    );
  }

}
