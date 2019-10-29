import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

export interface PlanetInfo {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents: string[],
  films: string[],
  created: string,
  edited: string,
  url: string
}

export interface ResidentInfo {
  name: string,
  birth_year: string,
  eye_color: string,
  gender: string,
  hair_color: string,
  height: string,
  mass: string,
  skin_color: string,
  homeworld: string,
  films: string[],
  species: string[],
  starships: string[],
  vehicles: string[],
  url: string,
  created: string,
  edited: string
}

export interface FilmInfo {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: string,
  species: string[],
  starships: string[],
  vehicles: string[],
  characters: string[],
  planets: string[],
  url: string,
  created: string,
  edited: string
}

export interface DataArr {
  count: number,
  next: string,
  previous: string,
  results: PlanetInfo[],
  length: number
}

export interface Loader {
  msg: string,
  operationCount: number
}

@Injectable({
  providedIn: 'root'
})
export class PlanetDataService {

  sub: Subscription
  loading: Loader = {
    msg: '',
    operationCount: 0
  }
  nextRequest = 'https://swapi.co/api/planets/?page=1'
  planetRequest = 'https://swapi.co/api/planets/1/'
  planetInfoList: PlanetInfo[] = []
  planetInfo: PlanetInfo
  planetsInDataBase = 1
  reqNumOfPlanet = 25
  i = 0
  filmNames: string[]
  residentsNames: string[]
  currentPage = 0
  maxPage: number
  serverIsAvailable = true

  constructor(private http: HttpClient, private router: Router) {}

  async getPlanetsData() {
    this.changeLoaderStatus(`loading information about planets (0%)`)
    while (this.i !== Math.ceil(this.planetsInDataBase / 10) && this.serverIsAvailable) {
      try {
        this.changeLoaderStatus(
          `loading information about planets (${Math.round((100 * this.i) / Math.ceil(this.planetsInDataBase / 10))}%)`
        )
        const planetData = await this.http.get<DataArr>(`${this.nextRequest}`).toPromise()
        this.planetsInDataBase = planetData.count
        this.nextRequest = planetData.next
        this.planetInfoList = this.planetInfoList.concat(planetData.results)
        this.serverIsAvailable = true
        this.i++
        this.changeLoaderStatus('')
      } catch (e) {
        this.serverIsAvailable = false
        this.loadMockListData()
      }
    }
    this.maxPage = Math.ceil(this.planetInfoList.length / this.reqNumOfPlanet) - 1
    this.changeLoaderStatus('')
  }

  getPlanetInfo (id: number) {
    this.changeLoaderStatus('getting core information')
    if (id) {
      this.planetRequest = `https://swapi.co/api/planets/${id}/`
    }
    if (typeof +id !== 'string' &&
      ((id <= 61 && !this.serverIsAvailable) ||
        (id <= this.planetInfoList.length && this.serverIsAvailable))) {
      this.sub = this.http.get<PlanetInfo>(`${this.planetRequest}`).subscribe(responce => {
        this.planetInfo = responce
        this.getFilmsName(responce.films)
        this.getResidentsName(responce.residents)
        this.changeLoaderStatus('')
      },
      error => {
        this.loadMockPlanetData(id)
        this.changeLoaderStatus('')
      })
    } else {
      this.changeLoaderStatus('')
      this.router.navigate(['/'])
    }
  }

  async getFilmsName(urls: string[]) {
    this.changeLoaderStatus('getting information about films')
    this.filmNames = []

    if (!this.serverIsAvailable) {
      urls = urls.map((url) => {
        return url.slice('https://swapi.co/api/films/'.length, url.length - 1)
      })
      for (let count = 0; count < urls.length; count++) {
        const tempFilm = await this.http.get<FilmInfo[]>(`http://localhost:4200/assets/films.json`).toPromise()
        this.filmNames.push(tempFilm[+urls[count] - 1].title)
      }
    } else {
      for (let count = 0; count < urls.length; count++) {
        const tempFilm = await this.http.get<FilmInfo>(`${urls[count]}`).toPromise()
        this.filmNames.push(tempFilm.title)
      }
    }
    if (this.filmNames.length === 0) {
      this.filmNames[0] = '-'
    }
    this.changeLoaderStatus('')
  }

  async getResidentsName(urls: string[]) {
    this.changeLoaderStatus('getting information about residents')
    this.residentsNames = []
    if (!this.serverIsAvailable) {
      urls = urls.map((url) => {
        return url.slice('https://swapi.co/api/people/'.length, url.length - 1)
      })
      for (let count = 0; count < urls.length; count++) {
        const tempResident = await this.http.get<ResidentInfo[]>(`http://localhost:4200/assets/residents.json`).toPromise()
        this.residentsNames.push(tempResident[+urls[count] - 1].name)
      }
    } else {
      for (let count = 0; count < urls.length; count++) {
        const tempResident = await this.http.get<ResidentInfo>(`${urls[count]}`).toPromise()
        this.residentsNames.push(tempResident.name)
      }
    }
    if (this.residentsNames.length === 0) {
      this.residentsNames[0] = '-'
    }
    this.changeLoaderStatus('')
  }

  changeLoaderStatus(msg: string) {
    if (msg === '') {
      setTimeout(e => --this.loading.operationCount, 1)
    } else {
      ++this.loading.operationCount
      this.loading.msg = msg
    }
  }

  async loadMockListData() {
    this.changeLoaderStatus('loading saved data')
    this.planetInfoList = await this.http.get<PlanetInfo[]>(`http://localhost:4200/assets/data.json`).toPromise()
    this.changeLoaderStatus('')
  }

  async loadMockPlanetData(id: number) {
    this.changeLoaderStatus('loading saved data')
    this.planetInfoList = await this.http.get<PlanetInfo[]>(`http://localhost:4200/assets/data.json`).toPromise()
    this.planetInfo = this.planetInfoList[id - 1]
    this.getFilmsName(this.planetInfo.films)
    this.getResidentsName(this.planetInfo.residents)
    this.changeLoaderStatus('')
  }
}
