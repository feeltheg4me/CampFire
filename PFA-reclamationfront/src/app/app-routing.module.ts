import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddreclamationComponent} from "./pages/addreclamation/addreclamation.component";
import {HeaderfooterComponent} from "./frontoffice/headerfooter/headerfooter.component";
import {TestComponent} from "./frontoffice/test/test.component";
import {MyclaimsComponent} from "./pages/myclaims/myclaims.component";
import {AlltemplatebackComponent} from "./backoffice/alltemplateback/alltemplateback.component";
import {GererreclamationComponent} from "./pages/gererreclamation/gererreclamation.component";
import {ReclamationService} from "./services/reclamation.service";
import {ReclamationdetailsComponent} from "./pages/reclamationdetails/reclamationdetails.component";
import {ReclamationdashboardComponent} from "./pages/reclamationdashboard/reclamationdashboard.component";

const routes: Routes = [

  { path:'addreclamation',
    component : AddreclamationComponent},
  { path:'home',
    component : HeaderfooterComponent,
    children:[
      { path:'addreclamation',
        component : AddreclamationComponent},
      { path:'myclaims',
        component : MyclaimsComponent}

    ]
  },
  {
    path: 'admin',
    component: AlltemplatebackComponent,
    children:[
      {
        path : 'reclamations', component : GererreclamationComponent

      },
      { path: 'reclamation/:id', component:ReclamationdetailsComponent },
      { path: 'reclamationdashboard', component:ReclamationdashboardComponent },

    ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
