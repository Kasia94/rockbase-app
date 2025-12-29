import { Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { BandsListComponent } from './bands/bands-list.component';
import { HeroComponent } from './hero/hero.component';
import { ConcertsComponent } from './concerts/concerts.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'bands', component: BandsListComponent },
  { path: 'bands/:id', component: BandsListComponent },
  { path: 'concerts', component: ConcertsComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'albums/:id', component: AlbumsComponent },
];
