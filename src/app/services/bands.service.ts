import { Concert } from '../models/concert.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Band } from '../models/band.model';
import { Album } from '../models/album.model';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root',
})
export class BandsService {
  private apiUrl = 'https://www.theaudiodb.com/api/v1/json/2';

  constructor(private http: HttpClient) {}

  searchBand(name: string) {
    return this.http.get<{ artists: Band[] }>(`${this.apiUrl}/search.php?s=${name}`).pipe(
      catchError((error) => {
        console.error('Błąd Api:', error);
        return of({ artists: [] });
      })
    );
  }

  getBandById(id: string) {
    return this.http.get<{ artists: Band[] }>(`${this.apiUrl}/artist.php?i=${id}`).pipe(
      catchError((error) => {
        console.error('Błąd Api:', error);
        return of({ artists: [] });
      })
    );
  }

  getAlbums(name: string) {
    return this.http.get<{ album: Album[] }>(`${this.apiUrl}/searchalbum.php?s=${name}`).pipe(
      map((response) => ({ albums: response.album || [] })),
      catchError((error) => {
        console.error('Błąd Api:', error);
        return of({ albums: [] });
      })
    );
  }
  getAlbumById(id: string) {
    return this.http.get<{ album: Album[] }>(`${this.apiUrl}/album.php?m=${id}`).pipe(
      map((response) => ({ albums: response.album || [] })),
      catchError((error) => {
        console.error('Błąd Api:', error);
        return of({ albums: [] });
      })
    );
  }
}
