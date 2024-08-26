import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { Carousel, CarouselModule } from 'primeng/carousel'
import { ButtonModule } from 'primeng/button'
import { TagModule } from 'primeng/tag'
import { NgIf } from '@angular/common'
import { CarouselService } from '../../services/carousel.service'
import { CarouselItem } from '../../models/CarouselItem'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { trigger, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-images-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, NgIf, ProgressSpinnerModule],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.css',
})
export class ImagesCarouselComponent implements OnInit {
  useFullCarousel: boolean = false
  carouselItems: CarouselItem[] = []
  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    let pathname = window.location.pathname
    if (pathname == '/') pathname = '/home'

    this.carouselService.getConfig(pathname.substring(1)).then((result: CarouselItem[]) => {
      // let pathname = window.location.pathname
      // if (pathname == '/') pathname = '/home'
      this.carouselItems = result //.filter((x) => x.subPage == pathname.substring(1))
      console.log(this.carouselItems)
      if (this.carouselItems.length > 1) this.useFullCarousel = true
      else this.useFullCarousel = false
    })
  }

  getConfig(id: number): CarouselItem | undefined {
    if (this.carouselItems[id] == undefined) return undefined
    return this.carouselItems[id]
  }
}
