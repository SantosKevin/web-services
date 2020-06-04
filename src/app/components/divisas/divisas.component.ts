import { Component, OnInit } from '@angular/core';
import { Divisas } from 'src/app/models/divisas';
import { DivisasService } from 'src/app/services/divisas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.css']
})
export class DivisasComponent implements OnInit {

  from: string;
  to: string;
  value: string;
  resultado: string;

  divisa: Divisas;
  divisas: Array<any>;
  nombresMonedas: Array<any>;
  monedas: Array<any> //para mostrar en los select

  
  constructor(private divisasService:DivisasService, private toastr: ToastrService) { 
    this.divisa = new Divisas();
    this.divisas = new Array<any>();
    this.nombresMonedas = new Array<string>();
    this.llenarMonedasCodigo();
    this.llenarNombresMonedas();
    this.llenarArrayTabla(); 
  }

  ngOnInit(): void {
  }

  public llenarMonedasCodigo(){
    this.monedas = this.divisasService.getMonedasConCodigo();
  }

  public llenarNombresMonedas(){
    this.nombresMonedas = this.divisasService.getNombresMonedas();
  }

  public llenarArrayTabla(){
    this.mostrarToastInicio();
    for(var i =0 ; i < this.nombresMonedas.length ; i++){
        this.conversorMonedasTabla(this.nombresMonedas[i]);
    }
    console.log(this.divisas);
  }

  
  public conversorMonedasTabla(base:string): any{
    this.divisasService.getDivisas(base).subscribe( 
      (result) => {
          this.divisa = new Divisas();
          this.divisa.from = result['base'];
          this.divisa.amount = "1";
          var rates = result['rates'];
          this.divisa.to = this.prepararArray(rates, this.divisa);          
          this.divisas.push(this.divisa);
      }, 
      error => { alert("Error en la petición"); } )
  }

  //una vez que obtengo el objeto "rates" con todas las monedas y sus respectivos valores, preparo el objeto
  //divisa, su atributo To que es un array y lo voy cargando con lo que tiene el objeto rates
  public prepararArray(rates: any, divisaActual: Divisas): Array<Divisas>{
    var arrayTo = new Array<Divisas>();
    this.nombresMonedas.forEach(element => {
      if(element.toString() == divisaActual.from){ //como el service no me devuelve la moneda "base", la cargo manualmente
        var moneda = new Divisas();
        moneda.from = divisaActual.from;
        moneda.amount = "1"; moneda.to = null;
        arrayTo.push(moneda);
      }
      else{
        var moneda  = new Divisas(); 
        moneda.from = element.toString();
        moneda.amount = rates[element.toString()];
        moneda.to = null;
        arrayTo.push(moneda);
      } 
    });
    return arrayTo;
  }

  //metodo que calcular cual es valor inverso de una moneda, recorre el array de Divisas
  //y luego se posiciona en el que conincida con "from", de ahi busca en su array "To" el nombre a buscar el inverso 
  public calcularInverseTabla(from: string, to:string){
    for(var i=0; i< this.divisas.length; i++){
      if(this.divisas[i].from == from){
        for(var j=0; j< this.divisas[i].to.length; j++){
          if(this.divisas[i].to[j].from == to){
            return this.divisas[i].to[j].amount;
          }
        }
      }
    }
  }

  public conversorFormulario(): any{
    this.divisasService.convertirDivisaFormulario(this.from,this.to ,this.value).subscribe( 
      (result) => {
        this.resultado = result['result-float'];
      }, 
      error => { alert("Error en la petición"); } )
  }

  public getImagenTabla(from: string){
    return "./../../../assets/img/paisesDivisas/" + from + ".png";
  }

  public mostrarToastInicio(){
    this.toastr.warning("Si los numero '1' no estan ubicados en la diagonal principal, por favor recarge la pagina ", "Info Divisas", {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  public cambiarColor(mon1: string, mon2:string){
    if(mon1 != mon2)
      return "text-primary";
    else
      return "text-dark";
  }

}
