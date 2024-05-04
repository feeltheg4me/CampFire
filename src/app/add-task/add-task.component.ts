import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Task } from '../model/task';
import { Project } from '../model/project';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  idProject!: number;
  constructor(private pS: ProjectService,
    private ac: ActivatedRoute,
  private r:Router) {
    this.idProject = this.ac.snapshot.params['id'];
  }

  task = new FormGroup({
    title: new FormControl(''),
    dateD: new FormControl(''),
    dateF: new FormControl(''),
    status: new FormControl(''),
    project:new FormControl()
  });
  get dateD() {
    return this.task.get('dateD');
  }

  get dateF() {
    return this.task.get('dateF');
  }
  getError() {
    //    le ! pour dire c null ne verfiie pas
    if (new Date(this.dateD!.value!) > new Date(this.dateF!.value!)) {
      return true;
    }
    return false;
  }

  addTask(){
    this.task.value.status = "To Do";
    this.pS.getProjectByid(this.idProject).subscribe(
      (data)=>{this.task.value.project = data as Project;
      this.pS.AddTask(this.task.value as Task).subscribe(
        ()=>this.r.navigate(['/tasks'])
      );
    });
  }
}
