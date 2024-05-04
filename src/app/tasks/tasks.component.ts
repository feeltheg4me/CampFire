import { Component } from '@angular/core';
import { Task } from '../model/task';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  listTasks: Task[] = []
  nbTasks!: number;
  constructor(private pS: ProjectService) {
    this.pS.getTasks().subscribe({
      next : (data)=>this.listTasks = data as Task[]
    })
  }

  calculTasks() {
    this.nbTasks = 0;
    this.nbTasks = this.listTasks.filter((t)=>t.status === 'Done').length
  }
}
