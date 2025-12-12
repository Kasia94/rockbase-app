import { Component, inject } from '@angular/core';
import { BandsService } from '../services/bands.service';
import { Album } from '../models/album.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums-slider',
  standalone: true,
  imports: [],
  templateUrl: './albums-slider.component.html',
  styleUrl: 'albums-slider.component.scss',
})
export class AlbumsSliderComponent {
  private _router = inject(Router);
  albums: Album[] = [];
  popularBands = ['Metallica', 'Nirvana', 'Queen', 'Pink Floyd'];

  constructor(private bandService: BandsService) {}

  ngOnInit(): void {
    this.popularBands.forEach((band) =>
      this.bandService.getAlbums(band).subscribe((data) => {
        this.albums = [...this.albums, ...data.albums];
      })
    );
  }

  goToAlbum(album: Album) {
    this._router.navigate(['/albums', album.idAlbum]);
  }
}
