import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core'
import { ReferencesCarouselComponent } from '../../components/references-carousel/references-carousel.component'
import { RealisationsPanelComponent } from '../../components/realisations-panel/realisations-panel.component'
import { InfoPanelComponent } from '../../components/info-panel/info-panel.component'
import { ApiService, ConfigGroup } from '../../services/api.service'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReferencesCarouselComponent, RealisationsPanelComponent, InfoPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('shortDescription') shortDesc: ElementRef

  constructor(private apiService: ApiService) {}
  aboutUsShort: string = ''
  aboutUsShortImage: string = ''

  ngAfterViewInit(): void {
    this.apiService.getGeneralConfig(ConfigGroup.AboutUs).then((result: any) => {
      this.shortDesc.nativeElement.innerHTML = result['aboutUsShort'].value
      this.aboutUsShortImage = result['aboutUsShortImage'].value + '?' + Date.now()
    })
  }
}
