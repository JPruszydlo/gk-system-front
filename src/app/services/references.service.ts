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
export class ReferencesService {
  private apiUrl: string = 'http://api.gk-system.myshort.pl/references'
  // private apiUrl: string = 'https://localhost:7068/references'
  constructor(private http: HttpClient) {}

  getReferences(): Promise<any> {
    return new Promise((response) => {
      this.http.get(this.apiUrl).subscribe({
        next: (resp: any) => {
          response(resp)
        },
      })
    })
  }
}
