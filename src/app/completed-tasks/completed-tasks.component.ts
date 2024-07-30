import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { Task } from '../model/task';
import { FilterCompletedPipe } from '../pipe/filter-completed.pipe';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatList,
    MatListItem,
    FilterCompletedPipe
  ],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css',
})
export class CompletedTasksComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  showCompletedTasks: boolean = true; 

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.todoService.getAllTask().subscribe(
      (res) => {
        console.log('Tareas obtenidas:', res);
        this.taskArr = res;
        console.log('taskArr:', this.taskArr);
      },
      (err) => {
        console.log('Error al obtener lista de tareas', err);
      }
    );
  }
}
