import {Component, OnInit} from '@angular/core';
import {PlanetDataService} from './services/planet-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'planetSWAPI'
  constructor(private planetDataService: PlanetDataService) { }

  ngOnInit(): void {
  }

}
