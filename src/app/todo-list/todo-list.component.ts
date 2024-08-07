import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Task } from '../model/task';
import { FilterCompletedPipe } from '../pipe/filter-completed.pipe';

import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPseudoCheckbox } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    MatPseudoCheckbox,
    FormsModule,
    RouterLink,
    RouterModule,
    FilterCompletedPipe
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  taskObj : Task = new Task();
  taskArr: Task[] = [];
  showCompletedTasks: boolean = false;

  editTaskValue: string = '';
  editingTask: any = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
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

  deleteTask(etask : Task) {
    this.todoService.deleteTask(etask).subscribe(res => {
      this.ngOnInit()
      alert('Tarea eliminada exitosamente')
    }, err => {
      console.log("Error al eliminar", err)
    })
  }

  editTask() {
    this.taskObj.title = this.editTaskValue
    this.todoService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit()
    }, err => {
      console.log('Error al editar', err)
    })
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.title;
    console.log(this.taskObj = etask)
  }

  toggleComplete(task : Task) {
    this.todoService.updateTask(task).subscribe(res => {
      console.log("Tarea actualizada: ", res)
    }, err => {
      console.log('Error al actualizar estado de la tarea', err)
    })
  }
}
