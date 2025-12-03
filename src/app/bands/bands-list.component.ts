import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { BandsService } from '../services/bands.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-bands-list',
    imports: [PaginationComponent, SearchComponent],
    templateUrl: './bands-list.component.html',
    styleUrl: './bands-list.component.scss'
})
export class BandsListComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private bandService = inject(BandsService);
  page = signal(1);
  pageSize = signal(5);
  bandName = signal('');

  bandSignal = signal<{ artists: any[] }>({ artists: [] });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const name = params['band'];
      if (name) {
        this.bandName.set(name);
        this.bandService.searchBand(name).subscribe((result) => {
          this.bandSignal.set(result);
          this.page.set(1);
        });
      } else {
        this.bandName.set('');
        this.bandSignal.set({ artists: [] });
      }
    });
  }

  paginatedBands = computed(() => {
    const bands = this.bandSignal().artists || [];
    const start = (this.page() - 1) * this.pageSize();
    return bands.slice(start, start + this.pageSize());
  });

  searchBand(name: string) {
    this.bandName.set(name);
    if (name) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { band: name },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });
      this.bandSignal.set({ artists: [] });
    }
  }
}
