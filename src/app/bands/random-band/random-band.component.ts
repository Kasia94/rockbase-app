import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BandsService } from '../../services/bands.service';
import { Band } from '../../models/band.model';

@Component({
  selector: 'app-random-band',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './random-band.component.html',
  styleUrls: ['./random-band.component.scss']
})
export class BandOfTheDayComponent implements OnInit {
  artist?: Band;
  loading = true;
  error?: string;
  
  private router = inject(Router);

  // lista ID artystów do losowania
  private artistIds = ['111279', '111311', '111304', '111289', '111283', '111291', '111255', '111239', '111280', '111300', '111297', '111298', '111310', '111307'
    ,'111309', '111313', '111315', '111282', '119851', '112030', '112029'
     ]; 

  constructor(private bandService: BandsService) {}


  ngOnInit(): void {
    const randomId = this.artistIds[Math.floor(Math.random() * this.artistIds.length)];

    this.bandService.getBandById(randomId).subscribe({
      next: (res) => {      
        this.artist = res.artists?.[0];
        this.loading = false;
      },  
      error: () => {
        this.error = 'Nie udało się pobrać kapeli na dziś.';
        this.loading = false;
      }
    });
  }

  onPoznaj(): void {
    if (this.artist?.idArtist) {
      this.router.navigate(['/bands', this.artist.idArtist]);
    }
  }
}
