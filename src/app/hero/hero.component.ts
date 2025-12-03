import { Component } from '@angular/core';
import { AlbumsSliderComponent } from '../albums/albums-slider.component';


@Component({
    selector: 'app-hero',
    imports: [AlbumsSliderComponent],
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss']
})
export class HeroComponent {}
