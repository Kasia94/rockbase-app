import { Component } from '@angular/core';
import { BandsService } from '../services/bands.service';
import { Album } from '../models/album.model';


@Component({
  selector: 'app-albums-slider',
  standalone: true,
  imports: [],
  templateUrl: './albums-slider.component.html',
  styleUrl: 'albums-slider.component.scss',
})
export class AlbumsSliderComponent {
  albums: Album[] = [];
  popularBands = ['Metallica', 'Nirvana', 'Queen', 'Pink Floyd', 'Guns N Roses'];

  constructor(private bandService: BandsService) {}

  ngOnInit(): void {
    this.popularBands.forEach((band) =>
      this.bandService.getAlbums(band).subscribe((data) => {
        this.albums = [...this.albums, ...data.albums];
      })
    );
  }
}
