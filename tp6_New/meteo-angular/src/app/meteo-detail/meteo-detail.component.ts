import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeteoService } from '../services/meteo.service';

@Component({
  selector: 'app-meteo-detail',
  templateUrl: './meteo-detail.component.html',
  styleUrls: ['./meteo-detail.component.css'],
})
export class MeteoDetailComponent implements OnInit {
  meteo: any;
  latlon: string = '';

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) { }

  ngOnInit() {
    this.getMeteo();
  }

  chunkArray(array: any[], size: number): any[] {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  roundTemperature(temp: number): number {
    return Math.round(temp);
  }

  getMeteo(): void {
    // pour lire la paramètre 'name' dans l'URL de la page  comme définit dans le router avec
    // path: 'meteo/:name'
    const name = this.route.snapshot.paramMap.get('name');

    console.log('getmeteo pour', name);
    if (name) {
      this.meteoService
        .getMeteo(name)
        .then((response) => {
          this.meteo = response;
          this.latlon = `${this.meteo.city.coord.lat},${this.meteo.city.coord.lon}`;
        })
        .catch((fail) => (this.meteo = fail));
    }
  }
}
