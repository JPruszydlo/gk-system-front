import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ReferencesComponent } from './pages/references/references.component'
import { RealizationsComponent } from './pages/realizations/realizations.component'
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { AuthService } from './services/authentication.service'
import { Password, PasswordModule } from 'primeng/password'
import { FormsModule } from '@angular/forms'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

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
})
export class AppComponent implements AfterViewInit {
  contentReady: boolean = false
  title = 'gk-system'
  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.contentReady = true
  }

  isUserAuthorised() {
    return this.authService.isAuthorised()
  }
  tryLogIn(username: HTMLInputElement, passwd: Password) {
    if (username.value == '' || passwd.value == null) {
      confirm('Nie podano hasła lub nazwy użytkownika')
      return
    }
    if (!this.authService.login(username.value, passwd.value)) {
      confirm('Błędny użytkownik lub hasło')
    }
    username.focus()
    username.value = ''
    passwd.clear()
  }
}
