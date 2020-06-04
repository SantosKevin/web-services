import { Component, OnInit } from '@angular/core';
import { Covid } from 'src/app/models/covid';
import { CovidService } from 'src/app/services/covid.service';
import { ToastrService } from 'ngx-toastr';

/* import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; */

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {

  covid: Covid;
  estadisticas: Array<Covid>;

  paisesSelect: Array<any>;

  /* atributos a mostrar cuando se presione el boton consultar informacion */
  confirmados: boolean;
  curados: boolean;
  fallecidos: boolean;
  pais: string;
  covidConsultaInformacion: Covid;

  constructor(private covidService: CovidService, private toastr: ToastrService) { 
    this.covid = new  Covid();
    this.estadisticas = new Array<Covid>();
    this.paisesSelect = new Array<string>();
    this.cargarEstadisticas();
    this.cargarListaPaises();
    this.covidConsultaInformacion = new Covid();
    this.confirmados = false;
    this.curados = false;
    this.fallecidos = false;
    this.pais = '';

   /*  config.backdrop = 'static';
    config.keyboard = false; */
  }

  ngOnInit(): void {
  }

  public cargarListaPaises(){
    this.paisesSelect = this.covidService.getListaPaises();
  }

  public cargarEstadisticas(){
    this.mostrarToastInicio();
    var paises = this.covidService.getListaPaises();
    paises.forEach(element => {
      this.cargarPorPais(element.toString());
    });
    console.log(this.estadisticas);
  }

  public cargarPorPais(country: string){
    this.covidService.getEstadisticas(country).subscribe( 
      (result) => {
            this.covid = new Covid(); 
            this.covid.country = result['Country_text'];
            this.covid.deaths = result['Total Deaths_text'];
            this.covid.recovered = result['Total Recovered_text'];
            this.covid.actives = result['Active Cases_text'];
            this.covid.confirmed = result['Total Cases_text'];
            this.estadisticas.push(this.covid);
      }, 
      error => { alert("Error en la petición"); } )
  }

  public getImagenPaises(country: string){
    return "./../../../assets/img/paises/" + country + ".png"; 
  }

  /* public abrirModal(contenido) {
    this.modalService.open(contenido);
  } */

  //para mostrar en el modal la informacion solicitada
  public prepararCovid(){
    this.estadisticas.forEach(element => {
      if(this.pais == element.country){
        this.covidConsultaInformacion = element;
      }
    });
  }

  public limpiarDatos(){
    this.confirmados = false;
    this.fallecidos = false;
    this.curados = false;
    
    this.covidConsultaInformacion = new Covid();
  }
  public mostrarToastInicio(){
    this.toastr.info("Las estadisticas se estan cargando...", "Info Estadisticas", {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
}
