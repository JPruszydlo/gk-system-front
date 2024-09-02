import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

export type EmailModel = {
  text: string
  phone: string
  email: string
  name: string
  surname: string
}
@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(private http: HttpClient) {}

  sendMail(emailModel: EmailModel): Promise<string> {
    return new Promise((response, error) => {
      let httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
      let url = 'https://api.gk-system.myshort.pl/home/mail'
      let body = JSON.stringify(emailModel)
      this.http.post<EmailModel>(url, body, httpOptions).subscribe({
        next: (resp) => {
          response('Wysłano maila')
        },
        error: (resp) => {
          error('Bład wysyłania maila')
        },
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
