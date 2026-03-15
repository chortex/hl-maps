import { Routes } from '@angular/router';
import { MapDemoComponent } from './components/map-demo/map-demo.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo',
  },
  {
    path: 'demo',
    title: 'HL Maps - Demo',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'map-basic',
      },
      {
        path: 'map-basic',
        component: MapDemoComponent,
        title: 'HL Maps - Basic Map',
      },
    ],
  },
  // {
  //   path: 'docs',
  //   loadComponent: () => import('./docs/docs.component').then(m => m.DocsComponent),
  //   title: 'HL Maps – Documentation',
  // },
  {
    path: '**',
    redirectTo: 'demo',
  },
];
