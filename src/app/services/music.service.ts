import { Injectable } from '@angular/core';
import { Concert } from '../models/concert.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { error } from 'node:console';
import { RockTrack } from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
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
  getRandomRockTrack() {
    return this.http.get<{ recordings: any[] }>(
      `${this.apiUrl}recording?query=tag:rock&fmt=json`,
      { headers: new HttpHeaders({ 'User-Agent': 'RockBaseApp/1.0.0 (kontakt@twojadomena.pl)' }) }
    ).pipe(
      map(res => {
        const recordings = res.recordings ?? [];
        if (!recordings.length) return null;
  
        const randomIndex = Math.floor(Math.random() * recordings.length);
        const rec = recordings[randomIndex];
        const artist = rec['artist-credit']?.[0]?.name ?? 'Unknown Artist';
        const title = rec.title ?? '';
        const query = encodeURIComponent(`${artist} ${title}`);
        const externalUrl = `https://www.youtube.com/results?search_query=${query}`;
  
        // mapowanie na model RockTrack
        const track: RockTrack = {
          id: rec.id,
          title: title,
          artist: artist,
          album: rec.releases?.[0]?.title ?? undefined,
          duration: rec.length ?? undefined,
          year: rec.firstrelease_date ?? undefined,
          externalUrl: externalUrl
        };
  
        return track;
      })
    );
  }
}
