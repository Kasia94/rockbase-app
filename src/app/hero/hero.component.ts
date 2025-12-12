import { Component } from '@angular/core';
import { AlbumsSliderComponent } from '../albums/albums-slider.component';
import { BandOfTheDayComponent } from '../bands/random-band/random-band.component';
import { RandomRockPlayerComponent } from '../random-rock-player/random-rock-player.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AlbumsSliderComponent, BandOfTheDayComponent, RandomRockPlayerComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {}
