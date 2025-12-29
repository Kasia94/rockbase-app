import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Band } from '../models/band.model';
import { Album } from '../models/album.model';
import { environment } from '../../enviroments/enviroment';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class BandsService extends BaseApiService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.theAudioDbApiUrl;

  searchBand(name: string): Observable<{ artists: Band[] }> {
    return this.http
      .get<{ artists: Band[] }>(`${this.apiUrl}/search.php?s=${name}`)
      .pipe(this.handleError<{ artists: Band[] }>({ artists: [] }));
  }

  getBandById(id: string) {
    return this.http.get<{ artists: Band[] }>(`${this.apiUrl}/artist.php?i=${id}`).pipe(
      this.handleError<{ artists: Band[] }>({ artists: [] })
      // catchError((error) => {
      //   console.error('Błąd Api:', error);
      //   return of({ artists: [] });
      // })
    );
  }

  getAlbums(name: string) {
    return this.http.get<{ album: Album[] }>(`${this.apiUrl}/searchalbum.php?s=${name}`).pipe(
      map((response) => ({ albums: response.album || [] })),
      this.handleError<{ albums: Album[] }>({ albums: [] })
      // catchError((error) => {
      //   console.error('Błąd Api:', error);
      //   return of({ albums: [] });
      // })
    );
  }
  getAlbumById(id: string) {
    return this.http.get<{ album: Album[] }>(`${this.apiUrl}/album.php?m=${id}`).pipe(
      map((response) => ({ albums: response.album || [] })),
      this.handleError<{ albums: Album[] }>({ albums: [] })
      // catchError((error) => {
      //   console.error('Błąd Api:', error);
      //   return of({ albums: [] });
      // })
    );
  }
}
