import { Component, computed, inject, signal } from '@angular/core';

import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { BandsService } from '../services/bands.service';

import { ActivatedRoute, Router } from '@angular/router';
// import { Band } from '../models/band.model';
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

  // bandSignal = signal<{ artists: Band[] }>({ artists: [] });
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

  // ngOnInit() {
  //   this.route.queryParams.subscribe((params) => {
  //     const name = params['band'];
  //     const bandId = this.route.snapshot.paramMap.get('id');
  //     if (name) {
  //       this.bandName.set(name);
  //       this.bandService.searchBand(name).subscribe((result) => {
  //         this.bandSignal.set(result);
  //         this.page.set(1);
  //       });
  //     } else if (bandId) {
  //       this.bandService.getBandById(bandId).subscribe((result) => {
  //         this.bandSignal.set(result);
  //       });
  //     } else {
  //       this.bandName.set('');
  //       this.bandSignal.set({ artists: [] });
  //     }
  //   });
  // }

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
