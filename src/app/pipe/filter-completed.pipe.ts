import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';

@Pipe({
  name: 'filterCompleted',
  standalone: true
})
export class FilterCompletedPipe implements PipeTransform {

  transform(tasks: Task[], showCompleted: boolean): Task[] {
    if(!tasks) {
      return []
    }
    return tasks.filter(tasks => tasks.completed === showCompleted)
  }

}
