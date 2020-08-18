import { Component, OnInit } from '@angular/core';
import { Category } from "./category";
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from "../services/alertify.service";
import { CategoryService } from "../services/category.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]  //category.service.ts de Injectable olduğu için Bu şekilde Providers ile çağırılması gerekiyor.
})
export class CategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService, 
    private http: HttpClient,
    private activatedRoute:ActivatedRoute) { } //url'de ki parametreyi (product/2) yakalamak için
  title = "Kategori Listesi"
  categories: Category[];
  ngOnInit() {
      this.categoryService.getCategories().subscribe(data=>{this.categories = data});    //Biz subscribe diyene kadar data sonlandırılmıyor. 
  }

}
