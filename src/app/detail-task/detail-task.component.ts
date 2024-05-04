import { Component } from '@angular/core';
import { Task } from '../model/task';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent {
  task !: Task;
  status = new FormControl('');
  constructor(private ac: ActivatedRoute, private pS: ProjectService) {
    this.pS.getTaskByID(this.ac.snapshot.params['id']).subscribe({
        next : (data)=> this.task = data as Task
    })
  }

  updateTask() {
    this.task.status = this.status.value!;

    this.pS.updateTask(this.task).subscribe({
      next : ()=>{}
    })
  }
}

