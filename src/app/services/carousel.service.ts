import { Injectable } from '@angular/core'
import { Reference } from '../models/Reference'
import { HttpClient, HttpParams } from '@angular/common/http'
import { GeneralConfigItem } from '../models/GeneralConfigItem'
import { CarouselItem } from '../models/CarouselItem'

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private URL: string = 'https://api.gk-system.myshort.pl/carousel'
  // private URL: string = 'https://localhost:7068/carousel'
  constructor(private http: HttpClient) {}

  getConfig(subPage: string) {
    let apiUrl = this.URL + '/config/' + subPage
    return new Promise<CarouselItem[]>((response) => {
      this.http.get<CarouselItem[]>(apiUrl).subscribe({
        next: (resp: CarouselItem[]) => {
          response(resp)
        },
      })
    })
  }

  tempConfig: CarouselItem[] = [
    {
      image: '../../../assets/images/header_1.jpg',
      contentText: 'Perfekcyjnie wykonujemy zlecenia korzystając materiałów dostępnych na rynku.',
      contentTitle: 'Budowa domów jednorodzinnych',
      subPage: 'home',
    },
    {
      image: '../../../assets/images/header_2.jpg',
      contentText:
        'Realizujemy prace od fundamentów aż po dach a także wykończenie wnętrza do stanu deweloperskiego lub pod klucz.',
      contentTitle: 'Szeroki zakres prac',
      subPage: 'home',
    },
    {
      image: '../../../assets/images/header_3.jpg',
      contentText: 'Zlecenia wykonujemy profesjonalnie i w korzystnych cenach. Warunki zlecenia ustalamy indywidualnie',
      contentTitle: 'Atrakcyjne ceny',
      subPage: 'home',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'for-sell',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'for-sell-details',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'about-us',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'realisations',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'references',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'contact',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'home',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'home',
    },
    {
      image: '../../../assets/images/hardhat-4274430_1920.jpg',
      contentText: '',
      contentTitle: '',
      subPage: 'home',
    },
  ]
}
