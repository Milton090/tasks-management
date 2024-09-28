import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { RouterModule } from '@angular/router';
import { TasksRoutes } from './tasks.routing';
import { TaskFormComponent } from './task-form/task-form.component';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    NgbDropdownModule,
    MatDialogModule,
    RouterModule.forChild(TasksRoutes),
    TaskFormComponent,
  ],
  exports: [TaskListComponent]
})
export class TaskModule { }
