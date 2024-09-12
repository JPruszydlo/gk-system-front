import { Component, OnInit } from '@angular/core'
import { CarouselModule } from 'primeng/carousel'
import { ButtonModule } from 'primeng/button'
import { Reference } from '../../models/Reference'
import { ApiService } from '../../services/api.service'
import { ImageModule } from 'primeng/image'
import { ReferencesService } from '../../services/references.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-references-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, ImageModule, RouterModule],
  templateUrl: './references-carousel.component.html',
  styleUrl: './references-carousel.component.css',
})
export class ReferencesCarouselComponent implements OnInit {
  constructor(private referencesService: ReferencesService) {}
  ngOnInit(): void {
    this.referencesService.getReferences().then((result) => {
      this.references = result
    })
  }
  references: Reference[] = []

  responsiveOptions = [
    {
      breakpoint: '650px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '1000px',
      numVisible: 2,
      numScroll: 1,
    },
  ]
}
