import { Component, OnInit } from '@angular/core'
import { OffersService } from '../../services/offers.service'
import { Offer } from '../../models/OfferDetails'
import { CarouselModule } from 'primeng/carousel'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { animate, style, transition, trigger } from '@angular/animations'
import { GalleriaThumbnails } from 'primeng/galleria'

@Component({
  selector: 'app-for-sell',
  standalone: true,
  imports: [CarouselModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './for-sell.component.html',
  styleUrl: './for-sell.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ transform: 'scale(0)' }), animate(300, style({ transform: 'scale(1)' }))]),
    ]),
  ],
  providers: [],
})
export class ForSellComponent implements OnInit {
  dataReady: boolean = false
  offers: Offer[] = []
  constructor(private offerService: OffersService) {}

  ngOnInit(): void {
    this.offerService.getThumbnails().then((result) => {
      this.offers = result
    })
  }
}
