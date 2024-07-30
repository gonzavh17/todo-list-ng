import { Routes } from '@angular/router';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';

export const routes: Routes = [
    { path: '', component: MainViewComponent },
    { path: 'completedTasks', component: CompletedTasksComponent }
];
