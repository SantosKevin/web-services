export class Zodiaco {
    name: string;
    date_range: string;
    current_date: string;
    description: string;
    compatibility: string;
    mood:string;
    color:string;
    lucky_number: number;
    type_day: string;

    Zodiaco(name?: string, date_range?: string,current_date?: string, description?: string, compatibility?: string, mood?: string,color?: string, lucky_number?: number,type_day?: string){
        this.name = name;
        this.date_range = date_range;
        this.current_date = current_date;
        this.description = description;
        this.compatibility = compatibility;
        this.mood = mood;
        this.color = color;
        this.lucky_number = lucky_number;
        this.type_day = type_day;
    }
}
