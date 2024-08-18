import { Injectable } from '@angular/core'
import { Reference } from '../models/Reference'
import { HttpClient, HttpParams } from '@angular/common/http'
import { GeneralConfigItem } from '../models/GeneralConfigItem'

export enum ConfigGroup {
  Undefined = -1,
  Contact,
  GooglMapTag,
  PrivatePolicyInfo,
  AboutUs,
  LogoImage,
  Carousel,
}

export enum GeneralParamName {
  Phone,
  PostCode,
  City,
  District,
  Street,
  HouseNumber,
  FlatNumber,
  GoogleTag,
  PolicyText,
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private URL: string = 'http://api.gk-system.myshort.pl/'
  constructor(private http: HttpClient) {}

  getGeneralConfig(configGroup: ConfigGroup) {
    let apiUrl = this.URL + `home/generalconfig?configGroup=${configGroup}`
    return new Promise((response) => {
      this.http.get<{ [name: string]: GeneralConfigItem }>(apiUrl).subscribe({
        next: (resp: { [name: string]: GeneralConfigItem }) => {
          response(resp)
        },
      })
    })
  }
}
