import { Routes } from '@angular/router';
import { MapDemoComponent } from './components/map-demo/map-demo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/demo/map',
    pathMatch: 'full',
  },
  {
    path: 'demo/map',
    component: MapDemoComponent,
    title: 'HL Maps - Basic Demo',
  },
  {
    path: '**',
    redirectTo: '/demo/map',
  },
];
