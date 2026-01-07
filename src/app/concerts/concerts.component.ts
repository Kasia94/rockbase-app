import { toSignal } from '@angular/core/rxjs-interop';
import { MusicService } from '../services/music.service';
import { Component, computed, inject, signal } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-concerts',
  imports: [PaginationComponent, SearchComponent],
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.scss',
})
export class ConcertsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private musicService = inject(MusicService);

  page = signal(1);
  pageSize = signal(3);
  concertName = signal('');

  concerts = toSignal(
    this.route.queryParams.pipe(
      switchMap((params) => {
        const name = params['event'];
        return name ? this.musicService.getConcerts(name) : of({ events: [] });
      })
    ),
    { initialValue: { events: [] } }
  );

  paginatedConcerts = computed(() => {
    const concerts = this.concerts().events ?? [];
    const start = (this.page() - 1) * this.pageSize();
    return concerts.slice(start, start + this.pageSize());
  });

  searchConcert(name: string) {
    this.concertName.set(name);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: name ? { event: name } : {},
      queryParamsHandling: name ? 'merge' : undefined,
    });
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
  }
  totalItems = computed(() => this.concerts().events.length);
}
