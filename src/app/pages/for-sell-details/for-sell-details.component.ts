import { Component, OnInit } from '@angular/core'
import { OffersService } from '../../services/offers.service'
import { Offer, OfferDetails } from '../../models/OfferDetails'
import { GalleriaModule } from 'primeng/galleria'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { TabViewModule } from 'primeng/tabview'
import { BrowserModule } from '@angular/platform-browser'
import { ImageModule } from 'primeng/image'

@Component({
  selector: 'app-for-sell-details',
  standalone: true,
  imports: [GalleriaModule, FormsModule, CommonModule, TabViewModule, ImageModule],
  templateUrl: './for-sell-details.component.html',
  styleUrl: './for-sell-details.component.css',
})
export class ForSellDetailsComponent implements OnInit {
  constructor(private offerService: OffersService) {}
  offerDetails: Offer | undefined
  activeIndex: number = 0
  displayCustom: boolean = false
  fullscreen: boolean = false
  fullscreenActive: number = 0

  gallery: string[] | undefined

  getTotal(details: OfferDetails[]): string {
    let result = 0.0
    details.forEach((element) => {
      result += parseFloat(element.value)
    })

    return result.toFixed(2) + ' m2'
  }
  toggleFullscreen(activeIndex: number | undefined) {
    this.fullscreenActive = activeIndex ?? 0
    this.fullscreen = !this.fullscreen
  }
  ngOnInit(): void {
    let params = new URLSearchParams(window.location.search)
    let index = params.get('index')
    if (index == null) return
    this.offerService.getOffer(parseInt(index)).then((result) => {
      this.offerDetails = result
      this.gallery = []
      result.offerVisualisations.forEach((element) => {
        if (this.gallery != undefined) this.gallery.push(element.image)
      })
      result.offerPlans.forEach((element) => {
        if (this.gallery != undefined) this.gallery.push(element.image)
      })
    })
  }

  responsiveOptions = [
    {
      breakpoint: '1328px',
      numVisible: 4,
    },
    {
      breakpoint: '1092px',
      numVisible: 3,
    },
    {
      breakpoint: '460px',
      numVisible: 2,
    },
    {
      breakpoint: '330px',
      numVisible: 1,
    },
    // {
    //   breakpoint: '1000px',
    //   numVisible: 4,
    //   numScroll: 1,
    // },
  ]
}
