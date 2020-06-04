export class Divisas {
    from: string; //nombre ej CAD
    to: Array<Divisas>; //monedas a convetir, ej CAD,ARS,EUR
    amount: string; //cantidad a convertir
    
    Divisas(from?: string, amount?: string,to?: Array<Divisas>){
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

}
