import { Component } from '@angular/core'
import { ApiService, ConfigGroup } from '../../services/api.service'

@Component({
  selector: 'app-technical-break',
  standalone: true,
  imports: [],
  templateUrl: './technical-break.component.html',
  styleUrl: './technical-break.component.css',
})
export class TechnicalBreakComponent {
  mail: string = ''
  phone: string = ''
  location: string = JSON.stringify(window.location)
  constructor(private apiService: ApiService) {
    apiService.getGeneralConfig(ConfigGroup.Undefined).then((result: any) => {
      this.mail = result['email'] == undefined ? '' : result['email'].value
      this.phone = result['phone'] == undefined ? '' : result['phone'].value
    })
  }
}
