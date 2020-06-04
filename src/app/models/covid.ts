export class Covid {
    country: string;
    confirmed: string;
    recovered: string;
    actives: string;
    deaths: string;

    Covid(country?: string, confirmed?: string, recovered?: string, actives?: string, deaths?: string){
        this.country = country;
        this.confirmed = confirmed;
        this.recovered = recovered;
        this.actives = actives;
        this.deaths = deaths;
    }
}
