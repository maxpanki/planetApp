import { Component, OnInit } from '@angular/core';
import {PlanetDataService} from '../services/planet-data.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.scss']
})
export class PlanetCardComponent implements OnInit {

  constructor(public planetDataService: PlanetDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.planetDataService.getPlanetInfo(params.id)
    })
  }

}
