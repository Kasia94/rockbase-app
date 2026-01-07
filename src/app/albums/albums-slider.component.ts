import { Component, inject, OnInit, signal } from '@angular/core';
import { BandsService } from '../services/bands.service';
import { Album } from '../models/album.model';
import { Router } from '@angular/router';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-albums-slider',
  standalone: true,
  imports: [],
  templateUrl: './albums-slider.component.html',
  styleUrl: 'albums-slider.component.scss',
})
export class AlbumsSliderComponent implements OnInit {
  private bandService = inject(BandsService);
  private _router = inject(Router);

  loading = signal(true);
  error = signal<string | null>(null);

  albums = signal<Album[]>([]);

  popularBands = [
    'Nirvana',
    'Queen',
    'Pink Floyd',
    'Led Zeppelin',
    'Radiohead',
    'Pearl Jam',
    'U2',
    "Guns n' roses",
  ];

  ngOnInit(): void {
    const requests = this.popularBands.map((band) =>
      this.bandService.getAlbums(band).pipe(map((res) => res.albums || []))
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.albums.set(results.flat());
        this.loading.set(false);
      },
      error: () => {
        console.error('Nie udało się pobrać albumów');
        this.loading.set(false);
      },
    });
  }

  goToAlbum(album: Album) {
    this._router.navigate(['/albums', album.idAlbum]);
  }
}
