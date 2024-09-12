import { NgIf } from '@angular/common'
import { AfterViewInit, Component, OnInit } from '@angular/core'
import { EmailModel, EmailService } from '../../services/email.service'
import { ApiService, ConfigGroup } from '../../services/api.service'
import { GeneralConfigItem } from '../../models/GeneralConfigItem'
import { DomSanitizer } from '@angular/platform-browser'
import { animate, style, transition, trigger } from '@angular/animations'

import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  animations: [
    trigger('fadeIn', [transition('void -> *', [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))])]),
  ],
  providers: [],
})
export class FooterComponent implements OnInit {
  showFullFooter: boolean = true
  generalConfig: { [name: string]: GeneralConfigItem } = {}
  mapTag: string = ''
  constructor(
    private emailService: EmailService,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.showFullFooter = window.location.pathname != '/contact'
    this.apiService.getGeneralConfig(ConfigGroup.Undefined).then((result: any) => {
      this.generalConfig = result
      this.mapTag = this.getMapTag()
    })
  }
  getMapTag(): any {
    if (this.generalConfig['googleTag'] == undefined) return this.sanitizer.bypassSecurityTrustResourceUrl('')
    let tagsrc = new DOMParser()
      .parseFromString(this.generalConfig['googleTag'].value, 'text/html')
      .getElementsByTagName('iframe')[0].src

    return this.sanitizer.bypassSecurityTrustResourceUrl(tagsrc)
  }

  getConfigParam(name: string): string {
    if (this.generalConfig[name] == undefined) return ''
    return this.generalConfig[name].value
  }
  sendButtonClick(
    name: HTMLInputElement,
    surname: HTMLInputElement,
    phone: HTMLInputElement,
    email: HTMLInputElement,
    content: HTMLTextAreaElement
  ) {
    let fail = false
    if (this.emailService.validateElement(name)) fail = true
    if (this.emailService.validateElement(surname)) fail = true
    if (this.emailService.validateElement(phone)) fail = true
    if (this.emailService.validateElement(content)) fail = true
    if (fail) {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Uzupełniij wymagane pola!', life: 2000 })
      return
    }

    let emailModel: EmailModel = {
      name: name.value,
      surname: surname.value,
      phone: phone.value,
      email: email.value,
      text: content.value,
    }
    this.emailService.sendMail(emailModel).then(
      (response) => {
        let message = 'Dziękujemy za wysłanie wiadomości.\n'
        if (email.value != '') {
          message += 'Wysłaliśmy potwierdzenie na podany adres e-mail'
        }
        this.messageService.add({ severity: 'success', summary: '', detail: message })
        name.value = surname.value = phone.value = email.value = content.value = ''
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: '',
          detail:
            'Przepraszamy, nie możemy w tej chwili wysłać twojej wiadoności. Zadzwoń do nas lub spróbuj ponownie później.',
          life: 6000,
        })
      }
    )
  }
}
