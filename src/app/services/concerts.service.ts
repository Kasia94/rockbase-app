import { Injectable } from '@angular/core';
import { Concert } from '../models/concert.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class ConcertsService {
  private apiUrl = 'https://musicbrainz.org/ws/2/';

  constructor(private http: HttpClient) {}

  getConcerts(name: string) {
    const headers = new HttpHeaders({
      'User-Agent': 'RockBaseApp/1.0.0 (kontakt@twojadomena.pl)',
    });
    return this.http
      .get<{ events: any[] | null }>(`${this.apiUrl}event?query=${name}&fmt=json`)
      .pipe(
        map((res) => {
          return { events: res.events ?? [] } as { events: any[] };
        }),
        catchError((error) => {
          console.error('Błąd Api:', error);
          return of({ events: [] });
        })
      );
  }
}
