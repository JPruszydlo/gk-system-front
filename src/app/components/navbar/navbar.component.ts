import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core'
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() activeItem: string = ''
  @Input() appContent: HTMLDivElement

  windowWidth: number = window.innerWidth
  @Output() navChanged: EventEmitter<void> = new EventEmitter<void>()
  @ViewChild('navItems') navItems: ElementRef<HTMLUListElement>

  constructor(private router: Router) {
    router.events.forEach((event) => {})
  }
  toggleMenu() {
    let navItems = this.navItems.nativeElement
    if (navItems.classList.contains('nav-closed')) {
      navItems.classList.replace('nav-closed', 'nav-fade-in')
      return
    }
    if (navItems.classList.contains('nav-fade-in')) {
      navItems.classList.replace('nav-fade-in', 'nav-fade-out')
      return
    }
    if (navItems.classList.contains('nav-fade-out')) {
      navItems.classList.replace('nav-fade-out', 'nav-fade-in')
      return
    }
  }
  navigate(url: string) {
    this.appContent.classList.replace('fade-in', 'fade-out')
    setTimeout(() => {
      this.router.navigate([url]).then(() => {
        this.appContent.classList.replace('fade-out', 'fade-in')
      })
    }, 400)
    if (this.navItems.nativeElement.classList.contains('nav-fade-in')) this.toggleMenu()
    this.navChanged.emit()
  }
  resolveActiveElement(itemName: string): string {
    let location = window.location.pathname.substring(1)
    if (itemName == location || (itemName == 'for-sell' && location == 'for-sell-details')) {
      return 'active'
    }
    return ''
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (this.windowWidth < 999) this.navItems.nativeElement.classList.replace('nav-fade-in', 'nav-fade-out')
  }

  itemSelected() {
    this.navChanged.emit()
  }
}
