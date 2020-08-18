import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AlertifyService } from "../services/alertify.service";  //.. ile 2 klasör üste çıktık. Tek nokta olsa tek klasör üste çıkardık.
import { ProductService } from  '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [AlertifyService, ProductService]  // Bana "AlertifyService" nesnesinin örneğini oluştur. Başka services ler varsa virgül ile ekliyoruz. Bu instance oluşturuyor. Alertify local bir services mi (hepsiburada da ali ile mehmetin ayrı sepetleri olması) yoksa global bir service mi. Eğer global ise, global in bir instance sini alıyor. Eğer local ise onun bir instance sini oluşturuyor.
})
export class ProductComponent implements OnInit {

  constructor(
    private alertifyService: AlertifyService,
    private productService:ProductService, //Artık url'de ki parametreyi yakalayabiliriz.
    private activatedRoute:ActivatedRoute
    ) { }

  title = "Ürün Listesi";
  filterText = "";
  products: Product[];
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.productService.getProducts(params["categoryId"]).subscribe(data=>{ //Biz subscribe diyene akdar data sonlandırılmıyor.
        this.products = data
      });    
    })
  }
  path<T>(path: any) {
    throw new Error("Method not implemented.");
  }

  addToCart(product) {
    this.alertifyService.error(product.name + " sepete eklendi")
  }
}
