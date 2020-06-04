export class Noticia {
    id: number;
    tit: string;
    des: string;
    img: string;
    con: string;

    Noticia(id?: number,tit?: string , des?: string, img?: string, con?:string){
        this.id = id;
        this.tit = tit;
        this.des = des;
        this.img = img;
        this.con = con;
    }
}
