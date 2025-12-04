import { Component } from '@angular/core';
import { AlbumsSliderComponent } from '../albums/albums-slider.component';
import { BandOfTheDayComponent } from "../bands/random-band/random-band.component";


@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [AlbumsSliderComponent, BandOfTheDayComponent],
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss']
})
export class HeroComponent {}
