import { Injectable, ɵɵresolveBody } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ZodiacoService {

  constructor(private _http: HttpClient) { }

  public getSignos(signo: string, day: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
	      'x-rapidapi-key': 'bf67f65719msh6affec69b7a1f00p13f481jsnd03b9f288ed8',
	      'content-type': 'application/x-www-form-urlencoded'
      })
    };
    return this._http.post("https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign="+signo+"&day=" + day, null ,httpOptions);
  }

  public getNombresSignos(){
    var signos = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra","scorpio", "sagittarius", "capricorn", "aquarius","pisces"];
    return signos;
  }

 /*  public getNombresSignos2(){
    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "zodiac-sign.p.rapidapi.com",
        "x-rapidapi-key": "bf67f65719msh6affec69b7a1f00p13f481jsnd03b9f288ed8",
      })
    };
    return this._http.get("https://zodiac-sign.p.rapidapi.com/signs" ,httpOptions);
  } */
}
