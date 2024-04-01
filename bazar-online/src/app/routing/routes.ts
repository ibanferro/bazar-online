import { Routes } from "@angular/router";

import { ProductCardListComponent } from '../components/product-card-list/product-card-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';

export const routes: Routes = [
  {
    path: 'items/search/:query',
    component: ProductCardListComponent
  },
  {
    path: 'items/:id',
    component: ProductDetailsComponent
  },

];
