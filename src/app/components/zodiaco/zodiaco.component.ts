import { Component, OnInit } from '@angular/core';
import { ZodiacoService } from 'src/app/services/zodiaco.service';
import { Zodiaco } from 'src/app/models/zodiaco';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent implements OnInit {

  zodiaco: Zodiaco;
  signos: Array<Zodiaco>;
  nombresSignos: Array<string>;

  dia = "today";

  constructor(private zodiacoService: ZodiacoService, private toastr: ToastrService) {
    this.zodiaco = new Zodiaco();
    this.signos = new Array<Zodiaco>();
    this.nombresSignos = new Array<string>();
    this.actualizarDia();
  }

  ngOnInit(): void {
  }

  actualizarDia(){
    this.mostrarToast();
    this.signos = new Array<Zodiaco>();
    this.cargarSignos(this.dia);
  }

  public cargarSignos(dia: string){
    this.nombresSignos = this.zodiacoService.getNombresSignos();
    this.nombresSignos.forEach(element => {
      this.cargarUnSigno(element.toString(),dia);
    });
    console.log(this.signos);
  }
 
  public cargarUnSigno(signo: string, day: string){
    this.zodiacoService.getSignos(signo,day).subscribe( 
      (result) => {
          this.zodiaco = new Zodiaco();
          this.zodiaco.name = signo;
          this.zodiaco.type_day = day;
          Object.assign(this.zodiaco,result);
          this.signos.push(this.zodiaco);
      }, 
      error => { alert("Error en la petición"); } )
  }


  public devolverImagenLogo(name: string){
    return "./../../../assets/img/logosZodiaco/" + name + ".png";
  }

  public devolverImagenGrande(name: string){
    return "./../../../assets/img/imagenesZodiaco/" + name + ".png";
  }

  public mostrarToast(){
    this.toastr.info("Las informacion se estan cargando...", "Info Zodiaco", {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
}
