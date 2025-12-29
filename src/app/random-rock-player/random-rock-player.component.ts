import { Component, OnInit, inject } from '@angular/core';
import { MusicService } from '../services/music.service';
import { RockTrack } from '../models/track.model';
import { SafeUrlPipe } from '../safe-url.pipe';

@Component({
  selector: 'app-random-rock-player',
  templateUrl: './random-rock-player.component.html',
  styleUrls: ['./random-rock-player.component.scss'],
  imports: [SafeUrlPipe],
})
export class RandomRockPlayerComponent implements OnInit {
  private musicService = inject(MusicService);

  track: RockTrack | null = null;

  ngOnInit() {
    this.loadRandomTrack();
  }

  loadRandomTrack() {
    this.musicService.getRandomRockTrack().subscribe((track) => {
      this.track = track;
    });
  }

  openExternal(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
