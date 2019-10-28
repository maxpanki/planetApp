import { Pipe, PipeTransform } from '@angular/core';
import {PlanetInfo} from '../services/planet-data.service';

@Pipe({
  name: 'numData'
})
export class NumDataPipe implements PipeTransform {

  transform(input: string, type: string): string {
    if (input === 'unknown') {
      return 'unknown'
    }
    switch (type) {
      case 'population': {
        return this.transformNum(input) + ' creatures'
      }
      case 'diameter': {
        return this.transformNum(input) + ' kilometers'
      }
      case 'rotation_period': {
        return this.transformNum(input) + ' hours'
      }
      case 'orbital_period': {
        return this.transformNum(input) + ' days'
      }
      case 'surface_water': {
        return this.transformNum(input) + ' %'
      }
      default: {
        return input
      }
    }
  }
  transformNum(input: string): string {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

}
