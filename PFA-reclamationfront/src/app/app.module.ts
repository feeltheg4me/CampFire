import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddreclamationComponent } from './pages/addreclamation/addreclamation.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './frontoffice/header/header.component';
import { FooterComponent } from './frontoffice/footer/footer.component';
import { TestComponent } from './frontoffice/test/test.component';
import { HeaderfooterComponent } from './frontoffice/headerfooter/headerfooter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import { MyclaimsComponent } from './pages/myclaims/myclaims.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { SidebarComponent } from './backoffice/sidebar/sidebar.component';
import { AlltemplatebackComponent } from './backoffice/alltemplateback/alltemplateback.component';
import { GererreclamationComponent } from './pages/gererreclamation/gererreclamation.component';
import { ReclamationdetailsComponent } from './pages/reclamationdetails/reclamationdetails.component';
import { ModifierreclamationComponent } from './pages/modifierreclamation/modifierreclamation.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ReclamationdashboardComponent } from './pages/reclamationdashboard/reclamationdashboard.component';
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
    AddreclamationComponent,
    HeaderComponent,
    FooterComponent,
    TestComponent,
    HeaderfooterComponent,
    MyclaimsComponent,
    SidebarComponent,
    AlltemplatebackComponent,
    GererreclamationComponent,
    ReclamationdetailsComponent,
    ModifierreclamationComponent,
    ReclamationdashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,

    ChartsModule


  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]

})
export class AppModule { }
