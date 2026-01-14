import { Component, computed, inject, signal } from '@angular/core';

import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { BandsService } from '../services/bands.service';

import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bands-list',
  imports: [PaginationComponent, SearchComponent],
  templateUrl: './bands-list.component.html',
  styleUrl: './bands-list.component.scss',
})
export class BandsListComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private bandService = inject(BandsService);
  page = signal(1);
  pageSize = signal(5);
  bandName = signal('');

  bands = toSignal(
    this.route.queryParams.pipe(
      tap(() => this.page.set(1)),
      switchMap((params) => {
        const name = params['band'];
        const id = this.route.snapshot.paramMap.get('id');

        if (name) {
          return this.bandService.searchBand(name).pipe(map((res) => res.artists ?? []));
        }

        if (id) {
          return this.bandService.getBandById(id).pipe(map((res) => res.artists ?? []));
        }

        return of([]);
      })
    ),
    { initialValue: [] }
  );

  paginatedBands = computed(() => {
    const bands = this.bands() || [];
    const start = (this.page() - 1) * this.pageSize();
    return bands.slice(start, start + this.pageSize());
  });

  searchBand(name: string) {
    this.bandName.set(name);
    this.page.set(1);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: name ? { band: name } : {},
      queryParamsHandling: name ? 'merge' : undefined,
    });
  }
  onPageChange(newPage: number) {
    this.page.set(newPage);
  }
  totalItems = computed(() => this.bands().length);
}
