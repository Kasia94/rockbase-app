import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums/albums.component';
import { ConcertsComponent } from './concerts/concerts/concerts.component';
import { AddBandComponent } from './bands/add-band/add-band.component';
import { BandDetailComponent } from './bands/band-detail/band-detail.component';
import { BandsListComponent } from './bands/bands-list/bands-list.component';
import { HeroComponent } from './hero/hero.component';

export const routes: Routes = [{
  path: 'rock-base',
  component: AppComponent},
  { path: '', component: HeroComponent },
  { path: 'bands', component: BandsListComponent },
  { path: 'bands/:id', component: BandDetailComponent },
  { path: 'add', component: AddBandComponent },
  { path: 'concerts', component: ConcertsComponent },
  { path: 'albums', component: AlbumsComponent }
];
