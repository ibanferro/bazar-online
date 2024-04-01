import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly apiUrl: string = 'http://localhost:3000/products';

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  public getFilteredProducts(searchText: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`)
    .pipe(
      take(1),
      map((products: Product[]) => products.filter(
        (product: Product) => product.title.toLowerCase().includes(searchText.toLowerCase())
      ))
    );
  }

  public getProductById(id: number): Observable<Product | null> {
    return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
      take(1),
      map((products: Product[]) => products.find(
        (product: Product) => product.id === id
      ) || null)
    );
  }

}
