import { AfterContentInit, AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ReferencesComponent } from './pages/references/references.component'
import { RealizationsComponent } from './pages/realizations/realizations.component'
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { Password, PasswordModule } from 'primeng/password'
import { FormsModule } from '@angular/forms'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ApiService, ConfigGroup } from './services/api.service'
import { OffersService } from './services/offers.service'

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeIn', [transition(':enter', [style({ opacity: 0 }), animate('400ms', style({ opacity: 1 }))])]),
  ],
  providers: [OffersService],
})
export class AppComponent implements AfterViewInit, OnInit {
  contentReady: boolean = false
  title = 'gk-system'
  isTechnicalBreak: boolean = false
  constructor(private apiService: ApiService, private router: Router) {}

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    console.log('popstate')
    this.router.navigateByUrl(`${window.location.pathname}`, {
      onSameUrlNavigation: 'reload',
      skipLocationChange: true,
    })
  }

  ngOnInit(): void {
    this.apiService.getGeneralConfig(ConfigGroup.TechnicalBreak).then((result: any) => {
      this.isTechnicalBreak = result['isTechnicalBreak'].value == '0' ? false : true

      if (window.location.ancestorOrigins.contains('http://localhost:4200')) this.isTechnicalBreak = false

      if (this.isTechnicalBreak && window.location.pathname != '/technical-break')
        window.location.href = '/technical-break'
      if (!this.isTechnicalBreak && window.location.pathname == '/technical-break') window.location.href = '/'
    })
  }
  ngAfterViewInit(): void {
    this.contentReady = true
  }
}
