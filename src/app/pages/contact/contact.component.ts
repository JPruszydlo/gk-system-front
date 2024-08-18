import { Component, OnInit } from '@angular/core'
import { EmailModel, EmailService } from '../../services/email.service'
import { ApiService, ConfigGroup } from '../../services/api.service'
import { GeneralConfigItem } from '../../models/GeneralConfigItem'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  providers: [MessageService],
})
export class ContactComponent {
  sendBtnClass: string = 'btn-disabled'
  validationMessage: string = 'adasadsadasdadasdd'
  generalConfig: { [name: string]: GeneralConfigItem } = {}

  constructor(
    private emailService: EmailService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    apiService.getGeneralConfig(ConfigGroup.Undefined).then((result: any) => {
      this.generalConfig = result
    })
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
      (result) => {
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
          life: 8000,
        })
      }
    )
  }
}
