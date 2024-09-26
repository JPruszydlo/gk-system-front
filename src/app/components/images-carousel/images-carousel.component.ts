import { Component, OnInit } from '@angular/core'
import { CarouselModule } from 'primeng/carousel'
import { ButtonModule } from 'primeng/button'
import { TagModule } from 'primeng/tag'
import { NgIf } from '@angular/common'
import { CarouselService } from '../../services/carousel.service'
import { CarouselItem } from '../../models/CarouselItem'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterModule } from '@angular/router'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-images-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, NgIf, ProgressSpinnerModule, RouterModule],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.css',
})
export class ImagesCarouselComponent implements OnInit {
  useFullCarousel: boolean = false
  carouselItems: CarouselItem[] = []
  constructor(private carouselService: CarouselService, private router: Router, private apiService: ApiService) {}
  ngOnInit() {
    this.router.events.forEach(async (event) => {
      if (event instanceof NavigationStart) {
        window.scrollTo({
          top: 0,
        })
        this.loadCarousel(event.url == '/' ? '/home' : event.url.split('?')[0])
      }
      if (event instanceof NavigationEnd) {
      }
    })
    this.apiService.checkVisitor()
  }
  loadCarousel(pathname: string) {
    this.carouselService.getConfig(pathname.substring(1)).then((result: CarouselItem[]) => {
      this.carouselItems = result.filter((x) => x.subPage == pathname.substring(1))
      this.carouselItems[0].image = this.carouselItems[0]?.image
      this.carouselItems = this.carouselItems.map((x) => {
        return {
          image: x.image == '' ? '' : x.image + '?' + Date.now(),
          contentText: x.contentText,
          contentTitle: x.contentTitle,
          subPage: x.subPage,
        }
      })
      if (this.carouselItems.length > 1) this.useFullCarousel = true
      else this.useFullCarousel = false
    })
  }
  getConfig(id: number): CarouselItem | undefined {
    if (this.carouselItems[id] == undefined) return undefined
    return this.carouselItems[id]
  }
}
