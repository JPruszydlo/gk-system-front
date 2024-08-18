import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() activeItem: string = ''
  windowWidth: number = window.innerWidth
  @Output() navChanged: EventEmitter<void> = new EventEmitter<void>()
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
}
