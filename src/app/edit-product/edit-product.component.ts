import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: Product;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(id)
      .subscribe(product => this.product = product);
  }
}
