import { Routes } from '@angular/router';
import { HomeContentComponent } from './components/home-content/home-content.component';

export const routes: Routes = [
  { path: '', component: HomeContentComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  { path: '**', redirectTo: '' }
];
