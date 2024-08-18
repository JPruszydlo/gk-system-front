import { AfterViewInit, Component, ViewChild } from '@angular/core'
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
export class ImagesCarouselComponent implements AfterViewInit {
  useFullCarousel: boolean = false
  carouselItems: CarouselItem[] = []
  constructor(private carouselService: CarouselService) {
    this.useFullCarousel = window.location.pathname == '/'
  }

  ngAfterViewInit(): void {
    this.carouselService.getConfig().then((result) => {
      this.carouselItems = result
    })
  }
}
