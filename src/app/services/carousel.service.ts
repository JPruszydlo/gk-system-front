import { Injectable } from '@angular/core'
import { Reference } from '../models/Reference'
import { HttpClient, HttpParams } from '@angular/common/http'
import { GeneralConfigItem } from '../models/GeneralConfigItem'
import { CarouselItem } from '../models/CarouselItem'

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private URL: string = 'http://api.gk-system.myshort.pl/carousel'
  constructor(private http: HttpClient) {}

  getConfig() {
    let apiUrl = this.URL + '/getconfig'
    return new Promise<CarouselItem[]>((response) => {
      this.http.get<CarouselItem[]>(apiUrl).subscribe({
        next: (resp: CarouselItem[]) => {
          response(resp)
        },
      })
    })
  }
}
