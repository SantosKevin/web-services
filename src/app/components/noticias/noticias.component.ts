import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  categoria: string;
  noticia: Noticia;
  noticias: Array<Noticia>;

  leerMas: Array<any>;
  leerMenos: Array<any>;
  indiceNoticiaActual: number = -1;

  filterNoticia = '';
  
  constructor(private noticiaService:NoticiaService, private toastr: ToastrService) { 
    this.noticia = new Noticia();
    this.noticias = new Array<Noticia>();
    this.categoria = "soccer"; //al iniciar la carga de la pagina trae por defecto una noticia
    
    this.leerMas = new Array<boolean>();
    this.leerMenos = new Array<boolean>();
    this.cargarNoticias();
  }

  ngOnInit(): void {
  }

  //inicializo los botones de leer mas en true, y los de leermenos en false
  public inicializarArrays(){
    console.log(this.noticias.length)
    for(var i=0; i< this.noticias.length; i++){
      this.leerMas[i] = true;
      this.leerMenos[i] = false;
    }
  }

  public cargarNoticias(){
    this.mostrarToastAdvertencia();
    this.mostrarToastInicio();
    this.noticiaService.getNoticias(this.categoria).subscribe( 
      (result) => {
          this.noticias = new Array<Noticia>(); 
          result['arts'].forEach(element => {
            this.noticia = new Noticia(); 
            Object.assign(this.noticia,element);
            this.noticias.push(this.noticia);
          });
          console.log(this.noticias);
          console.log(this.noticias.length);
          this.inicializarArrays();
      }, 
      error => { alert("Error en la petición"); } )
      this.filterNoticia = '';    
  }


  public activarLeerMas(indice: any, contenido: Noticia){
    this.leerMas[indice] = false;
    this.leerMenos[indice] = true;
    this.quitarTagPDelContenidoNoticia(contenido);
  }

  public desactivarLeerMas(indice: any){
    this.leerMas[indice] = true;
    this.leerMenos[indice] = false;
  }

  //el contenido de la noticia viene con tags "<p></p>" y es necesario quitarlas para que sea legible la noticia
  public quitarTagPDelContenidoNoticia(contenido: Noticia){
    contenido.con = contenido.con.replace(/<p>/gi, '');
    contenido.con = contenido.con.replace(/<\/p>/gi, ' ');
     
  }

  public mostrarToastInicio(){
    this.toastr.info("Las noticias se estan cargando...", "Info Noticias", {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  public mostrarToastAdvertencia(){
    this.toastr.warning("Si las noticias no cargaron sus imagenes, por favor recarge la pagina", "Advertencia", {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
}
