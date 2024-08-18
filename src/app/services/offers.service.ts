import { Injectable } from '@angular/core'
import { Offer } from '../models/OfferDetails'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class OffersService {
  private URL: string = 'http://api.gk-system.myshort.pl/offers'
  constructor(private http: HttpClient) {}

  getThumbnails() {
    let apiUrl = this.URL + '/thumbnails'
    return new Promise<Offer[]>((response) => {
      this.http.get<Offer[]>(apiUrl).subscribe({
        next: (resp: Offer[]) => {
          response(resp)
        },
      })
    })
  }

  getOffer(index: number) {
    let apiUrl = this.URL + '/' + index
    return new Promise<Offer>((response) => {
      this.http.get<Offer>(apiUrl).subscribe({
        next: (resp: Offer) => {
          response(resp)
        },
      })
    })
  }
}
