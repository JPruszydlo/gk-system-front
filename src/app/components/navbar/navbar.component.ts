import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { NavigationStart, Route, Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() activeItem: string = ''
  windowWidth: number = window.innerWidth
  @Output() navChanged: EventEmitter<void> = new EventEmitter<void>()
  @ViewChild('navItems') navItems: ElementRef<HTMLUListElement>

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (this.windowWidth < 999) this.navItems.nativeElement.style.display = 'none'
      }
    })
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
    this.navItems.nativeElement.style.display = 'none'
  }

  itemSelected() {
    this.navChanged.emit()
  }
}
