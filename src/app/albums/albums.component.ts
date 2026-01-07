import { toSignal } from '@angular/core/rxjs-interop';
import { Component, computed, inject, signal } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';

import { SearchComponent } from '../search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BandsService } from '../services/bands.service';
import { of, switchMap } from 'rxjs';

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

  albums = toSignal(
    this.route.queryParams.pipe(
      switchMap((params) => {
        const name = params['album'];
        const id = this.route.snapshot.paramMap.get('id');

        if (name) {
          return this.bandService.getAlbums(name);
        }

        if (id) {
          return this.bandService.getAlbumById(id);
        }

        return of({ albums: [] });
      })
    ),
    { initialValue: { albums: [] } }
  );

  paginatedAlbums = computed(() => {
    const albums = this.albums().albums || [];
    const start = (this.page() - 1) * this.pageSize();
    return albums.slice(start, start + this.pageSize());
  });

  searchAlbums(name: string) {
    this.page.set(1);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: name ? { album: name } : {},
      queryParamsHandling: name ? 'merge' : undefined,
    });
  }
  onPageChange(newPage: number) {
    this.page.set(newPage);
  }
  totalItems = computed(() => this.albums().albums.length);
}
