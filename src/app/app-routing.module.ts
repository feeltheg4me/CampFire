import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { DetailTaskComponent } from './detail-task/detail-task.component';

const routes: Routes = [
  {path:'projects',component:ProjectsComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'tasks',component:TasksComponent},
  {path:'login',component:LoginComponent},
  {path:'add/:id',component:AddTaskComponent},
  {path:'details/:id',component:DetailTaskComponent},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
