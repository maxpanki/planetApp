import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface PlanetInfoList {
  name: string,
  rotation_period: number,
  orbital_period: number,
  diameter: number,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: number,
  population: number,
  residents: string[],
  created: string[],
  edited: string,
  url: string
}

export interface DataArr {
  next: string,
  previous: string,
  results: PlanetInfoList[],
  length: number
}

@Injectable({
  providedIn: 'root'
})
export class PlanetDataService {

  constructor(private http: HttpClient) {}

  getPlanetsData(nextRequest: string): Observable<DataArr> {
      return this.http.get<DataArr>(`${nextRequest}`)
  }
}
