import { Pipe, PipeTransform } from '@angular/core';
import {PlanetInfoList} from '../services/planet-data.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(cards: PlanetInfoList[], search: string = ''): PlanetInfoList[] {
    if(!search.trim()) {
      return cards
    }
    return cards.filter(card => {
      console.log(card.name)
      console.log(search)
      return card.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
