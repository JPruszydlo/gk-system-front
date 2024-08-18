import { Component, OnInit } from '@angular/core'
import { ApiService, ConfigGroup } from '../../services/api.service'

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements OnInit {
  aboutUsContent: string = ''

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getGeneralConfig(ConfigGroup.AboutUs).then((result: any) => {
      this.aboutUsContent = result['aboutUsLong'].value
    })
  }
}
