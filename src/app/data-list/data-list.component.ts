import {Component, Input, OnInit} from '@angular/core';
import {DataArr, PlanetDataService, PlanetInfoList} from '../services/planet-data.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  search = ''
  loading = false
  tempList: DataArr
  planetInfoList: PlanetInfoList[] = []
  nextRequest = 'https://swapi.co/api/planets/?page=1'
  i = 0

  constructor(private planetDataService: PlanetDataService){}
  ngOnInit() {
    this.fetchPlanets()
  }

  private async fetchPlanets() {
    this.loading = true
    while (this.i !== 3) {
      const planetData = await this.planetDataService.getPlanetsData(this.nextRequest).toPromise()
      this.tempList = planetData
      this.nextRequest = this.tempList.next
      this.planetInfoList = this.planetInfoList.concat(this.tempList.results)
      this.i++
    }
    this.loading = false
  }
}
