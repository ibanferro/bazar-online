import { Component } from '@angular/core';
import { mockProdList, Product } from '../../types/product';
import { take } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public searchText: string = '';

  public selectedProduct: Product | null = null;

  public originalProducts: Product[] = [];
  public filteredProducts: Product[] = [];

  constructor(
    private productServ: ProductService
  ) {

    this.getProducts();
  }

  public newSearchText(searchText: string): void {
    this.searchText = searchText;
    this.filterProducts();
    this.selectedProduct = null;
  }

  public getProducts(): void {
    this.productServ.getProducts().pipe(take(1)).subscribe(
      (products: Product[]) => {
        this.originalProducts = products;
        this.filterProducts();
      }
    );
  }

  public filterProducts(): void {
    if(!this.searchText) return;
    this.filteredProducts = this.originalProducts.filter(
      (product: Product) => this.normalizeProdTitle(product.title).includes(this.normalizeProdTitle(this.searchText))
    );
  }

  public normalizeProdTitle(title: string): string {
    return title.trim().toLowerCase();
  }

  public selectProduct(id: number): void {
    console.log('Product Id: ', id);

    this.selectedProduct = this.originalProducts.find(
      (product: Product) => product.id === id
    ) || null;
  }

}
