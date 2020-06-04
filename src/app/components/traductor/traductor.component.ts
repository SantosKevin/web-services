import { Component, OnInit } from '@angular/core';
import { Texto } from 'src/app/models/texto';
import { TraductorService } from 'src/app/services/traductor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.component.html',
  styleUrls: ['./traductor.component.css']
})
export class TraductorComponent implements OnInit {

  texto: Texto;
  salida: string;
  idiomas: Array<any>;

  constructor(private traductorService: TraductorService, private toastr: ToastrService) {
    this.texto = new Texto();
    this.texto.source = 'en';
    this.texto.target = 'es';
    this.texto.input = '';
    this.idiomas = this.traductorService.getIdiomas();
  }

  ngOnInit(): void {
  }

  traducir() {
   if(this.texto.input != ''){
    if (this.texto.source === this.texto.target) {
      this.salida = this.texto.input;
      this.mostrarToastPalabrasIguales();
    }
    else {
      this.mostrarToastTraducir();
      this.traductorService.getTranslation(this.texto).subscribe(
        (result) => {
          var resultados = result['outputs'];
          this.salida = resultados['0'].output;
        },
        error => { alert('Error en la petición'); }
      );
    }
   }
   else{
    this.mostrarTextoVacio();
   }
  }

  limpiarCampos(){
    this.texto.input = '';
    this.salida = '';
  }

  invertirIdiomas(){
    const source = this.texto.source;
    this.texto.source = this.texto.target;
    this.texto.target = source;
  }

  public mostrarToastTraducir(){
    this.toastr.info("Traduciendo...", "Info Traductor", {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  public mostrarToastPalabrasIguales(){
    this.toastr.info("El texto no necesita traduccion...", "Info", {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  public mostrarTextoVacio(){
    this.toastr.warning("Introduzca un texto por favor");
  }
}
