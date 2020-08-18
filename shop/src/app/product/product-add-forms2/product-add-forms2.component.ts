import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { __assign } from 'tslib';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

//Reactive formlarda (product-add-forms2) yeni geldi, normalde Klasik form (product-add-forms1) vardı. Reaktif formlarda validation işlemini componentlerde yapıyoruz. HTML sadece kontrol/görüntü için kullanılıyor. En önemli avantajı test edilebilirliktir ve olayı kodlarla merkezi tek bir noktadan yönetebiliyor olmaktır. 
@Component({
  selector: 'app-product-add-forms2',
  templateUrl: './product-add-forms2.component.html',
  styleUrls: ['./product-add-forms2.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddForms2Component implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoryService,
    private productService : ProductService,
    private alertifyService: AlertifyService) { }

  productAddForm: FormGroup;
  product: Product = new Product();
  categories: Category[];

  createproductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ["", Validators.required],  //Validators, doğrulayıcıdır. length, min ....
      description: ["", Validators.required],
      imageUrl: ["", Validators.required],
      price: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.createproductAddForm();
    this.categoryService.getCategories().subscribe(data => { this.categories = data });    //Biz subscribe diyene akdar data sonlandırılmıyor. 

  }

  add() {
    if (this.productAddForm.valid) {   //geçerli ise
      this.product = Object.assign({}, this.productAddForm.value)
    }
    this.productService.addProduct(this.product).subscribe(data=>{
      this.alertifyService.error(data.name + " başarıyla eklendi.")
    });
  }
}
