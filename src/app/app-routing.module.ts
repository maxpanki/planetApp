import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataListComponent} from './data-list/data-list.component';
import {PlanetCardComponent} from './planet-card/planet-card.component';


const routes: Routes = [
  {path: '', component: DataListComponent, pathMatch: 'full'},
  {path: 'planet/:id', component: PlanetCardComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
