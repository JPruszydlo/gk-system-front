import { AfterContentInit, AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ReferencesComponent } from './pages/references/references.component'
import { RealizationsComponent } from './pages/realizations/realizations.component'
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component'
import { CommonModule, Location } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { Password, PasswordModule } from 'primeng/password'
import { FormsModule } from '@angular/forms'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ApiService, ConfigGroup } from './services/api.service'
import { OffersService } from './services/offers.service'
import { NavigationService } from './services/navigation.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReferencesComponent,
    RealizationsComponent,
    NavbarComponent,
    ImagesCarouselComponent,
    CommonModule,
    FooterComponent,
    PasswordModule,
    FormsModule,
    ProgressSpinnerModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [OffersService],
})
export class AppComponent implements OnInit, AfterViewInit {
  contentReady: boolean = false
  title = 'gk-system'
  isTechnicalBreak: boolean = false
  constructor(private apiService: ApiService, private router: Router) {}

  ngAfterViewInit(): void {
    window.scrollTo({
      top: 0,
    })
  }
  ngOnInit(): void {
    this.apiService.getGeneralConfig(ConfigGroup.TechnicalBreak).then((result: any) => {
      this.isTechnicalBreak = result['isTechnicalBreak'].value == '0' ? false : true
      // if (window.location.ancestorOrigins.contains('http://localhost:4200')) this.isTechnicalBreak = false

      // if (this.isTechnicalBreak && window.location.pathname != '/technical-break')
      //   window.location.href = '/technical-break'
      // if (!this.isTechnicalBreak && window.location.pathname == '/technical-break') window.location.href = '/'
    })
  }
}
