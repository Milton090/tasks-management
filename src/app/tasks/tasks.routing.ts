import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

export const TasksRoutes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      component: TaskListComponent
   },
];
