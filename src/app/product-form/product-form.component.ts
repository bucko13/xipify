import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete,
  MatSnackBar,
} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { Category } from '../category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Input() type: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  productForm = new FormGroup({
    Name: new FormControl(),
    Description: new FormControl(),
    Url: new FormControl(),
    Categories: new FormControl([]),
  });
  filteredCategories: Observable<Category[]>;
  allCategories: Category[] = [];
  selectedCategories: Category[] = [];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private catService: CategoriesService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCategories();
    // on has this.product when editing an existing
    if (this.product) {
      this.productForm.patchValue({
        ...this.product,
        CategoryIds:
          this.product.Categories
          ? this.product.Categories.map(cat => cat.CategoryId)
          : [],
      });
      this.selectedCategories = this.product.Categories ? this.product.Categories : [];
    }
    this.filteredCategories = this.productForm.controls['Categories'].valueChanges.pipe(
      startWith(null),
      map((category: Category | null) => category ? this._filter(category) : this.selectedCategories.slice())
    );
  }

  getCategories(): void {
    this.catService.getCategories()
      .subscribe(cats => this.allCategories = cats);
  }

  displayCatList(categories: Category[]): string[] | undefined {
    return categories ? categories.map(cat => cat.Name) : undefined;
  }

  private _filter(category: Category): Category[] {
    const filterValue = category.Name.toLowerCase();
    return this.selectedCategories.filter(cat => cat.Name.toLowerCase() !== filterValue);
  }

  addCategory(category: Category): void {
    this.selectedCategories.push(category);
    this.productForm.patchValue({
      CategoryIds: this.selectedCategories.map(cat => cat.CategoryId)
    });
  }

  add(event: MatChipInputEvent): void {
    // Add  only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our category
      if ((value || '').trim()) {
        const category = this.allCategories.find(cat => cat.Name === value)
        this.addCategory(category)
      }

      // Reset the input value
      if (input)
        input.value = '';
    }
  }

  remove(category: Category): void {
    const index = this.selectedCategories.findIndex(cat => cat.Name === category.Name);

    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
      this.productForm.patchValue({
        CategoryIds: this.selectedCategories.map(cat => cat.CategoryId)
      });
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const category = this.allCategories.find(cat => cat.Name === event.option.value.Name)
    this.addCategory(category);
    this.categoryInput.nativeElement.value = '';
  }

  onSubmit(): void {
    const data = {
      ...this.productForm.value,
      Categories: undefined,
      CategoryIds: this.selectedCategories.map(cat => cat.CategoryId) };
    if (this.type === 'update') {
      const id = +this.route.snapshot.paramMap.get('id');
      this.productsService
        .updateProduct(data, id)
        .subscribe(() => this.openSnackBar('Product updated!'));
    }
    else if(this.type === 'new')
      this.productsService
        .addProduct(data)
        .subscribe(() => this.openSnackBar('Product added!'));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 1000,
    });
  }
}
