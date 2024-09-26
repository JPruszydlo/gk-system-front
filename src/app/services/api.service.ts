import { Injectable } from '@angular/core'
import { Reference } from '../models/Reference'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { GeneralConfigItem } from '../models/GeneralConfigItem'
import { LocalisationService } from './localisation.service'
import { Visitor } from '../models/visitor'
import { environment } from '../../environments/environment'
import { firstValueFrom, lastValueFrom, map } from 'rxjs'

type LoginToken = {
  token: string
  expiresInMin: number
}

export enum ConfigGroup {
  Undefined = -1,
  Contact,
  GooglMapTag,
  PrivatePolicyInfo,
  AboutUs,
  LogoImage,
  Carousel,
  TechnicalBreak,
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
  private URL: string = 'https://api.gk-system.myshort.pl/'
  // private URL: string = 'https://localhost:7068/'
  constructor(private http: HttpClient, private localisation: LocalisationService) {}

  get tokenValid(): boolean {
    if (sessionStorage.getItem('loginData') == undefined) return false
    let isValid = this.getToken().expired > new Date().getTime()
    if (!isValid) sessionStorage.removeItem('loginData')
    return isValid
  }

  getToken() {
    return JSON.parse(sessionStorage.getItem('loginData') ?? '{"token": "", "expired": 0}')
  }
  setToken(token: LoginToken) {
    let expired = new Date()
    expired.setMinutes(expired.getMinutes() + token.expiresInMin)
    sessionStorage.setItem('loginData', JSON.stringify({ token: token.token, expired: expired.getTime() }))
  }
  refreshToken() {
    let apiUrl = this.URL + 'home/authorizeclient'
    return this.http.post<LoginToken>(apiUrl, null)
  }
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

  checkVisitor() {
    let url = this.URL + 'home/checkvisitor'
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    var header = {
      headers: new HttpHeaders().set('Authorization', `Basic ${btoa(`${environment.apiUser}:${environment.apikey}`)}`),
    }

    this.localisation.getLocationData((result: Visitor) => {
      this.http.post<Visitor>(url, result, header).subscribe()
    })
  }
}
