import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  selectedFilter: string = 'all';
  tasks: Task[] = [];
  currentPage = 1;
  pageSize = 5;

  taskToEdit: Task | null = null;

  constructor(
    private taskService: TasksService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.taskService.tasksSubject.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  get filteredTasks() {
    let filtered = this.tasks;

    if (this.selectedFilter === 'completed') {
      filtered = filtered.filter(task => task.isCompleted);
    } else if (this.selectedFilter === 'pending') {
      filtered = filtered.filter(task => !task.isCompleted);
    }

    return filtered.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.currentPage = 1;
  }

  markAsCompleted(id: number) {
    this.taskService.markAsComplete(id);
  }

  editTask(task: Task) {
    this.taskToEdit = task;
  }


  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  openTaskForm(task?: Task) {
    this.dialog.open(TaskFormComponent, {
      data: task,
      width: '70%',
      height: 'auto',
      disableClose: true
    });
  }
}

