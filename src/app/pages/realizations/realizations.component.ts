import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core'
import { GalleriaModule } from 'primeng/galleria'
import { RealisationsService } from '../../services/realisations.service'
import { Realisation } from '../../models/Realisation'
import { animate, style, transition, trigger } from '@angular/animations'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-realizations',
  standalone: true,
  imports: [GalleriaModule, NgIf],
  templateUrl: './realizations.component.html',
  styleUrl: './realizations.component.css',
})
export class RealizationsComponent implements OnInit {
  dataReady: boolean = false
  currentGalleryImage: string = ''
  displayCustom: boolean = false
  tmp: string[] = []
  activeIndex: number = 0
  active_r_index: number = 0
  realisationTitle: string = ''
  realisations: Realisation[] = []
  constructor(private realisationsService: RealisationsService) {}
  ngOnInit(): void {
    this.realisationsService.getAll().then((result) => {
      result.map((x) => {
        x.realisationImages = x.realisationImages.map((y) => ({
          imageSrc: y.imageSrc,
          name: x.name,
        }))
      })

      this.realisations = result
      this.dataReady = true
    })
  }

  //   {
  //     title: 'Dom na dąbrowej',
  //     images: [
  //       '../../../assets/images/construction-site-592458_1920.jpg',
  //       '../../../assets/images/hardhat-4274430_1920.jpg',
  //       '../../../assets/images/header_1.jpg',
  //       '../../../assets/images/header_2.jpg',
  //       '../../../assets/images/header_3.jpg',
  //     ],
  //   },
  //   {
  //     title: 'Dom na pogodnej',
  //     images: [
  //       '../../../assets/images/header_3.jpg',
  //       '../../../assets/images/hardhat-4274430_1920.jpg',
  //       '../../../assets/images/construction-site-592458_1920.jpg',
  //       '../../../assets/images/header_1.jpg',
  //       '../../../assets/images/header_2.jpg',
  //     ],
  //   },
  // ]
  imageClick(r_index: number, img_index: number) {
    this.active_r_index = r_index
    this.activeIndex = img_index

    this.currentGalleryImage = this.realisations[r_index].realisationImages[img_index].imageSrc
    this.displayCustom = true
  }
  imageNext() {
    this.activeIndex++

    if (this.activeIndex >= this.realisations[this.active_r_index].realisationImages.length) this.activeIndex = 0
    this.currentGalleryImage = this.realisations[this.active_r_index].realisationImages[this.activeIndex].imageSrc
  }
  imagePrev() {
    this.activeIndex--

    if (this.activeIndex < 0) this.activeIndex = this.realisations[this.active_r_index].realisationImages.length - 1
    this.currentGalleryImage = this.realisations[this.active_r_index].realisationImages[this.activeIndex].imageSrc
  }
}
