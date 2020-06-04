import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private _http: HttpClient) { }

  public getListaPaises(){
    var paises = ["USA", "World", "Russia", "Spain","Italy"];
    return paises;
  }

  public getEstadisticas(country: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com',
	      'x-rapidapi-key': 'bf67f65719msh6affec69b7a1f00p13f481jsnd03b9f288ed8'
      })
    };
    return this._http.get("https://covid-19-tracking.p.rapidapi.com/v1/"+country, httpOptions);
  }
}
