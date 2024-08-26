import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CarouselItem } from '../models/CarouselItem'
import { Realisation, RealisationFavourite } from '../models/Realisation'

@Injectable({ providedIn: 'root' })
export class RealisationsService {
  private URL: string = 'http://api.gk-system.myshort.pl/realisations'
  // private URL: string = 'https://localhost:7068/realisations'
  constructor(private http: HttpClient) {}

  getFavourites() {
    let apiUrl = this.URL + '/favourites'
    return new Promise((response) => {
      this.http.get(apiUrl).subscribe({
        next: (resp: any) => {
          console.log(resp)
          response(resp)
        },
      })
    })
  }
  getAll() {
    return new Promise<Realisation[]>((response) => {
      this.http.get<Realisation[]>(this.URL).subscribe({
        next: (resp: Realisation[]) => {
          response(resp)
        },
      })
    })
  }
}
