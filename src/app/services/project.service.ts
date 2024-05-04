import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  getProjects() {
    return this.http.get('http://localhost:3000/projects');
  }
  getProjectByid(id:number){
    return this.http.get('http://localhost:3000/projects/'+id);
  }

  AddTask(task:Task){
    return this.http.post('http://localhost:3000/tasks',task);
  }
  getTasks(){
    return this.http.get('http://localhost:3000/tasks');
  }
  getTaskByID(id:number){
    return this.http.get('http://localhost:3000/tasks/'+id);
  }
  updateTask(task:Task){
    return this.http.put('http://localhost:3000/tasks/'+task.id,task);
  }
}
