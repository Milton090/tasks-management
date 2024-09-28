import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/tasks', pathMatch: 'full' },
      {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TaskModule)
      }
    ]
  },
];
