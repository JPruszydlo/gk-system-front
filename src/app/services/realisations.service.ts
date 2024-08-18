import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CarouselItem } from '../models/CarouselItem'
import { Realisation, RealisationFavourite } from '../models/Realisation'

@Injectable({ providedIn: 'root' })
export class RealisationsService {
  private URL: string = 'http://api.gk-system.myshort.pl/realisations'
  constructor(private http: HttpClient) {}

  getFavourites() {
    let apiUrl = this.URL + '/favourites'
    return new Promise<RealisationFavourite[]>((response) => {
      this.http.get<RealisationFavourite[]>(apiUrl).subscribe({
        next: (resp: RealisationFavourite[]) => {
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
