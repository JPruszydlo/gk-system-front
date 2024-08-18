import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Reference } from '../../models/Reference'
import { CommonModule } from '@angular/common'
import { ApiService } from '../../services/api.service'
import { ImageModule } from 'primeng/image'
import { ReferencesService } from '../../services/references.service'
import { ReplaySubject } from 'rxjs'
@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, ImageModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.css',
})
export class ReferencesComponent implements OnInit {
  references: Reference[] = []

  constructor(private referencesService: ReferencesService) {}

  ngOnInit(): void {
    this.referencesService.getReferences().then((result) => {
      this.references = result
    })
  }
}
