import { Pipe, PipeTransform } from '@angular/core';
import {PlanetDataService, PlanetInfo} from '../services/planet-data.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private planetDataService: PlanetDataService) { }
  transform(cards: PlanetInfo[], search: string = ''): PlanetInfo[] {
    let firstItem = this.planetDataService.currentPage * this.planetDataService.reqNumOfPlanet
    let lastItem = firstItem + this.planetDataService.reqNumOfPlanet

    if (!search.trim()) {
      this.planetDataService.maxPage = Math.ceil(this.planetDataService.planetInfoList.length / this.planetDataService.reqNumOfPlanet) - 1
      return cards.slice(firstItem, lastItem)
    }

    const itemsAfterFilter = cards.filter(card => {
      return card.name.toLowerCase().includes(search.toLowerCase())
    })
    this.planetDataService.maxPage = Math.ceil(itemsAfterFilter.length / this.planetDataService.reqNumOfPlanet) - 1
    if (this.planetDataService.maxPage < this.planetDataService.currentPage) {
      this.planetDataService.currentPage = 0
      firstItem = this.planetDataService.currentPage * this.planetDataService.reqNumOfPlanet
      lastItem = firstItem + this.planetDataService.reqNumOfPlanet
    }

    return itemsAfterFilter.slice(firstItem, lastItem)
  }

}
