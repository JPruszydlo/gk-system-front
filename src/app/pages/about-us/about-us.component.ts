import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ApiService, ConfigGroup } from '../../services/api.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements AfterViewInit {
  @ViewChild('aboutUsContent') aboutUsContent: ElementRef
  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    this.apiService.getGeneralConfig(ConfigGroup.AboutUs).then((result: any) => {
      this.aboutUsContent.nativeElement.innerHTML = result['aboutUsLong'].value
    })
  }
}
