import { Routes } from '@angular/router'
import { RealizationsComponent } from './pages/realizations/realizations.component'
import { ReferencesComponent } from './pages/references/references.component'
import { AboutUsComponent } from './pages/about-us/about-us.component'
import { ContactComponent } from './pages/contact/contact.component'
import { HomeComponent } from './pages/home/home.component'
import { ForSellComponent } from './pages/for-sell/for-sell.component'
import { ForSellDetailsComponent } from './pages/for-sell-details/for-sell-details.component'
import { TechnicalBreakComponent } from './pages/technical-break/technical-break.component'

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'for-sell-details', component: ForSellDetailsComponent },
  { path: 'for-sell', component: ForSellComponent },
  { path: 'references', component: ReferencesComponent },
  { path: 'realisations', component: RealizationsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'technical-break', component: TechnicalBreakComponent },
]
