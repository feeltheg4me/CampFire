import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  listProjects:Project[] = [];
  constructor(private cons:ProjectService) { }
  ngOnInit() {
    this.cons.getProjects().subscribe((data)=>{
      this.listProjects=data as Project[];
    })
  }
}
