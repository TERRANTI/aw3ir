import { Component, OnInit } from '@angular/core';
import { MeteoItem } from '../meteoItem';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  city: MeteoItem = {
    name: '',
    id: 0,
    weather: null,
  };

  cityList: MeteoItem[] = [];

  constructor() { }

  ngOnInit(): void {
    const storedList = localStorage.getItem('cityList');

    if (storedList !== undefined && storedList !== null) {
      this.cityList = JSON.parse(storedList);
    } else {
      this.cityList = [];
    }
  }

  isCityExist(_cityName: string) {
    if (
      this.cityList.filter(
        (item: MeteoItem) => item.name?.toUpperCase() == _cityName.toUpperCase()
      ).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  saveCityList() {
    localStorage.setItem('cityList', JSON.stringify(this.cityList));
  }

  onSubmit() {
    if (
      this.city.name !== undefined &&
      this.isCityExist(this.city.name) === false
    ) {
      let currentCity = new MeteoItem();
      currentCity.name = this.city.name;
      this.cityList.push(currentCity);

      this.saveCityList();

      const message = document.getElementById('adding');
      //const input = document.getElementById('myInput');

      if (message) {
        message.innerText = 'Ajouté avec succès!';
        message.style.display = 'block';

      } else {
        console.error('No message element found');
      }

    } else {
      console.log(this.city.name, 'Existe déjà dans la liste');
    }
  }

  remove(_city: MeteoItem) {
    // on utilise 'filter' pour retourne une liste avec tous les items ayant un nom différent de _city.name
    this.cityList = this.cityList.filter(
      (item: MeteoItem) => item.name != _city.name
    );
    this.saveCityList();
  }
}
