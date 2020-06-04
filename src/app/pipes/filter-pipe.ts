import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform{

    transform(value: any, arg: any): any{
        const resultado = [];
        for(const noticia of value){
            if(noticia.tit.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
                resultado.push(noticia);
            }
        }
        return resultado;
    }
}
