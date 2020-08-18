import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "./product";

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], filterText?: string): Product[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null  //Kullanıcının arama ifadesivarsa, küçük harfe çevir [JavaScript, büyük ve küçük harf duyarlı olduğu için hiç uğraşmadan, bu komut ile direkt küçük harfe  çeviriyor.] Yoksa, null
    return filterText ? value.filter((p: Product) => p.name.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
