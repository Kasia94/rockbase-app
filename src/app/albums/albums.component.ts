import { Album } from '../models/album.model';
import { Component, computed, inject, signal } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';

import { SearchComponent } from '../search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/bands.service';

@Component({
  selector: 'app-albums',
  imports: [PaginationComponent, SearchComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private bandService = inject(BandsService);

  albumName = signal('');
  page = signal(1);
  pageSize = signal(5);

  albumSignal = signal<{ albums: Album[] }>({ albums: [] });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const name = params['album'];
      const idAlbum = this.route.snapshot.paramMap.get('id');
      if (name) {
        this.albumName.set(name);
        this.bandService.getAlbums(name).subscribe((result) => {
          this.albumSignal.set(result);
          this.page.set(1);
        });
      } else if (idAlbum) {
        this.bandService.getAlbumById(idAlbum).subscribe((result) => {
          this.albumSignal.set(result);
        });
      } else {
        this.albumName.set('');
        this.albumSignal.set({ albums: [] });
      }
    });
  }

  paginatedAlbums = computed(() => {
    const albums = this.albumSignal().albums || [];
    const start = (this.page() - 1) * this.pageSize();
    return albums.slice(start, start + this.pageSize());
  });

  searchAlbums(name: string) {
    this.albumName.set(name);
    if (name) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { album: name },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });
      this.albumSignal.set({ albums: [] });
    }
  }
}
