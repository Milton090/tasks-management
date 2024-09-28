import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.tasksSubject = new BehaviorSubject<Task[]>(initialTasks);
  }

  addTask(task: Task) {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = [...currentTasks, task];
    this.tasksSubject.next(updatedTasks);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  markAsComplete(id: number): boolean {
    const currentTasks = this.tasksSubject.value;
    const taskFound = currentTasks.some(task => task.id === id);

    if (taskFound) {
      const updatedTasks = currentTasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      );

      this.tasksSubject.next(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return true;
    }

    return false;
  }


  deleteTask(id: number): boolean {
    const currentTasks = this.tasksSubject.value;
    const taskExists = currentTasks.some(task => task.id === id);

    if (taskExists) {
      const updatedTasks = currentTasks.filter(task => task.id !== id);
      this.tasksSubject.next(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return true;
    }

    return false;
  }


  updateTask(updatedTask: Task): boolean {
    const currentTasks = this.tasksSubject.value;
    const taskExists = currentTasks.some(task => task.id === updatedTask.id);

    if (taskExists) {
      const updatedTasks = currentTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );

      this.tasksSubject.next(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return true;
    }

    return false;
  }

}

