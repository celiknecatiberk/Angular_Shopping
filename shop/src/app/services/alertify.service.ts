import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({   //servis olması için bu decoratör [@Injectable] olması lazım 
  providedIn: 'root' // Bu servisi global anlamda default olarak ekleyen sistemdir.
})
export class AlertifyService {

  constructor() { }
    error(message: string){   //Fonksiyon ismi olan "success" ismini ben belirledim 
      alertify.error(message)
   
  }
}
