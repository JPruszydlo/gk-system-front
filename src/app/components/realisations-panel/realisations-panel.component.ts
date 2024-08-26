import { Component, OnInit } from '@angular/core'
import { GalleriaModule } from 'primeng/galleria'
import { RealisationsService } from '../../services/realisations.service'
import { RealisationFavourite } from '../../models/Realisation'
import { NgIf } from '@angular/common'

export type Image = {
  src: string
}
@Component({
  selector: 'app-realisations-panel',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './realisations-panel.component.html',
  styleUrl: './realisations-panel.component.css',
})
export class RealisationsPanelComponent implements OnInit {
  displayCustom: boolean = false

  activeIndex: number = 0
  favourites: RealisationFavourite[] = []
  constructor(private realisationsService: RealisationsService) {}
  ngOnInit(): void {
    this.realisationsService.getFavourites().then((result: any) => {
      this.favourites = result
    })
  }

  imageClick(index: number) {
    this.activeIndex = index
    this.displayCustom = true
  }
}
