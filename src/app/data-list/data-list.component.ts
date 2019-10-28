import {Component, OnInit} from '@angular/core';
import {PlanetDataService} from '../services/planet-data.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  search = ''

  constructor(public planetDataService: PlanetDataService){}
  ngOnInit() {
    this.planetDataService.getPlanetsData()
  }

  setPageSize(event: Event) {
    const element = event.target as HTMLElement
    this.planetDataService.changeLoaderStatus('Loading next page')
    this.planetDataService.reqNumOfPlanet = +element.textContent
    this.planetDataService.maxPage = (this.planetDataService.planetInfoList.length / +element.textContent) - 1
    this.planetDataService.currentPage = 0
    this.planetDataService.changeLoaderStatus('')
  }

  changePage(way: string) {
    switch (way) {
      case 'next': {
        this.planetDataService.changeLoaderStatus('Loading next page')
        this.planetDataService.currentPage++
        break;
      }
      case 'prev': {
        this.planetDataService.changeLoaderStatus('Loading previous page')
        this.planetDataService.currentPage--
        break;
      }
      default: {
        this.planetDataService.changeLoaderStatus('Error has occured. Fixing the problem.')
        this.planetDataService.currentPage = 0
      }
    }
    this.planetDataService.changeLoaderStatus('')
  }
}
