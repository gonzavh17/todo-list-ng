import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Task } from '../model/task';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  taskObj : Task = new Task();
  addTaskValue: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.taskObj = { completed: false, id: 0, title: '', comment: '' };
  }

  addTask(): void {
    if (this.taskObj.title && this.taskObj.comment) {
      this.todoService.addTask(this.taskObj).subscribe(
        res => {
          console.log('Task added successfully:', res);
          this.taskObj = {completed: false, id: 0, title: '', comment: '' };
          
        },
        err => {
          console.error('Error adding task:', err);
        }
      );
    } else {
      console.warn('Task title and comment are required');
    }
  }
}
