import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable, map, switchMap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  serviceURL : string;

  constructor(private http : HttpClient) { 
    this.serviceURL = "http://localhost:3000/tasks"
  }

  addTask(newTask: Task): Observable<Task> {
    return this.getAllTask().pipe(
      map((tasks: Task[]) => {
        const maxId = tasks.length ? Math.max(...tasks.map(task => task.id)) : 0;
        newTask.id = maxId + 1;
        return newTask;
      }),
      switchMap((task: Task) => this.http.post<Task>(this.serviceURL, task))
    );
  }

  getAllTask(): Observable<Task[]> {
    const params = new HttpParams().set('_cache', new Date().getTime().toString());
    return this.http.get<Task[]>(this.serviceURL, { params });
  }
  

  deleteTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.serviceURL + '/' + task.id)
  }

  editTask(task : Task) : Observable<Task> {
    return this.http.put<Task>(this.serviceURL + '/' + task.id , task)
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task);
  }
}