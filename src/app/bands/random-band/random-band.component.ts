import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BandsService } from '../../services/bands.service';
import { Band } from '../../models/band.model';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-random-band',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './random-band.component.html',
  styleUrls: ['./random-band.component.scss'],
})
export class BandOfTheDayComponent implements OnInit {
  private bandService = inject(BandsService);
  private router = inject(Router);

  artist = signal<Band | undefined>(undefined);
  error = signal<string | undefined>(undefined);

  loading = computed(() => !this.artist() && !this.error());

  // lista ID artystów do losowania
  private artistIds = [
    '111279',
    '111311',
    '111289',
    '111283',
    '111255',
    '111239',
    '111280',
    '111297',
    '111298',
    '111310',
    '111307',
    '111309',
    '111315',
    '119851',
    '112030',
    '112029',
  ];

  ngOnInit(): void {
    const randomId = this.artistIds[Math.floor(Math.random() * this.artistIds.length)];

    this.bandService
      .getBandById(randomId)
      .pipe(
        map((res) => res.artists?.[0]),
        catchError(() => {
          this.error.set('Nie udało się pobrać kapeli na dziś.');
          return of(undefined);
        })
      )
      .subscribe((artist) => this.artist.set(artist));
  }

  onPoznaj(): void {
    if (this.artist()?.idArtist) {
      this.router.navigate(['/bands', this.artist()?.idArtist]);
    }
  }
}
