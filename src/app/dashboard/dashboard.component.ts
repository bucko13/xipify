import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { Category } from '../category';
import { Product } from '../product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: Category[];
  products: Product[];

  constructor(
    private catService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void {
    const allCat: Category = {
      CategoryId: 0,
      Name: 'All',
    }
    this.catService.getCategories()
      .subscribe(cats => this.categories = [allCat, ...cats]);
  }

  getProducts(): void {
    this.productsService.getProducts()
      .subscribe(products => this.products = products);
  }

  getProductDetails(index): void {
    const id = this.products[index].ProductId;
    this.productsService.getProduct(id)
      .subscribe(productInfo => this.products[index] = productInfo);
  }
}
