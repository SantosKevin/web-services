import { Injectable, ɵɵresolveBody} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DivisasService {

  monedas: Array<any>;
  
  constructor(private _http: HttpClient) { 
    this.monedas = [ 
      { codigo: 'MXN' , nombre: 'MXN Pesos Mexicanos'},
      { codigo: 'EUR' , nombre: 'EUR Euros Europeos'},
      { codigo: 'GBP' , nombre: 'GBP libras Rusas'},
      { codigo: 'JPY' , nombre: 'JPY yenes Japoneses'},
      { codigo: 'USD' , nombre: 'USD dolares EEUU'},
      { codigo: 'ARS' , nombre: 'ARS pesos Argentinos'}
    ];
  }

  //solo convierte desde un from a un to y la cantidad
  public convertirDivisaFormulario(from:string, to: string, amount: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "community-neutrino-currency-conversion.p.rapidapi.com",
        "x-rapidapi-key": "bf67f65719msh6affec69b7a1f00p13f481jsnd03b9f288ed8",
        "content-type": "application/x-www-form-urlencoded",
      })
    };
    return this._http.post("https://community-neutrino-currency-conversion.p.rapidapi.com/convert?from-type="+from+ "&to-type="+to+"&from-value="+amount, null ,httpOptions);
  }

  public getNombresMonedas(){
    return ["MXN","EUR","GBP","JPY","USD"];
  }

  public getDivisas(from:string):Observable<any>{
    
    return this._http.get("https://api.ratesapi.io/api/latest?base="+ from);
  }

  public getMonedasConCodigo(){
    return this.monedas;
  }
}
