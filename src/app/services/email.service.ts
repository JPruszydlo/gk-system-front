import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LocalisationService } from './localisation.service'
import { Visitor } from '../models/visitor'

export type EmailModel = {
  text: string
  phone: string
  email: string
  name: string
  surname: string
}
export type FullEmailData = {
  email: EmailModel
  visitor: Visitor
}
@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private http: HttpClient, private localisation: LocalisationService) {}

  sendMail(emailModel: EmailModel): Promise<string> {
    return new Promise((response, error) => {
      let httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
      let url = 'https://api.gk-system.myshort.pl/home/mail'
      // let url = 'https://localhost:7068/home/mail'
      this.localisation.getLocationData((result: Visitor) => {
        let fullData: FullEmailData = {
          email: emailModel,
          visitor: result,
        }
        this.http.post<FullEmailData>(url, JSON.stringify(fullData), httpOptions).subscribe({
          next: (resp) => {
            response('Wysłano maila')
          },
          error: (resp) => {
            error('Bład wysyłania maila')
          },
        })
      })
    })
  }
  validateElement(input: HTMLInputElement | HTMLTextAreaElement) {
    if (input.value == '') {
      input.style.border = '2px solid red'
      return true
    }
    input.style.border = '2px solid #e5e7eb'
    return false
  }
}
