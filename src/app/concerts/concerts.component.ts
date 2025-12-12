import {  MusicService } from '../services/music.service';
import { Component, computed, inject, signal } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../models/concert.model';

@Component({
    selector: 'app-concerts',
    imports: [PaginationComponent, SearchComponent],
    templateUrl: './concerts.component.html',
    styleUrl: './concerts.component.scss'
})
export class ConcertsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private bandService = inject(MusicService);

  page = signal(1);
  pageSize = signal(2);
  concertName = signal('');

  concertSignal = signal<{ events: Concert[] }>({ events: [] });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const name = params['event'];
      if (name) {
        this.concertName.set(name);
        this.bandService.getConcerts(name).subscribe((result) => {
          this.concertSignal.set(result);
          this.page.set(1);
        });
      } else {
        this.concertName.set('');
        this.concertSignal.set({ events: [] });
      }
    });
  }

  paginatedConcerts = computed(() => {
    const concerts = this.concertSignal().events ?? [];
    const start = (this.page() - 1) * this.pageSize();
    return concerts.slice(start, start + this.pageSize());
  });

  searchConcert(name: string) {
    this.concertName.set(name);
    if (name) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { event: name },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });
      this.concertSignal.set({ events: [] });
    }
  }
}
