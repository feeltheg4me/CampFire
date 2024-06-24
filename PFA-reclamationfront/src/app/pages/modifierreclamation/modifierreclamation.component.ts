import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ReclamationService} from "../../services/reclamation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modifierreclamation',
  templateUrl: './modifierreclamation.component.html',
  styleUrls: ['./modifierreclamation.component.css']
})
export class ModifierreclamationComponent implements OnInit {
  reclamation: any;
  reclamationForm: FormGroup;
  constructor(
    private reclamationService: ReclamationService,
    private router:Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModifierreclamationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reclamation = data.reclamation;
    this.reclamationForm = this.formBuilder.group({
    titre: [this.data.reclamation.titre, Validators.required],
    description: [this.data.reclamation.description, Validators.required]
  }); }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.reclamationForm = this.formBuilder.group({
      idReclamation:[this.data.reclamation.idReclamation, Validators.required],
      titre: [this.data.reclamation.titre, Validators.required],
      description: [this.data.reclamation.description, Validators.required]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  @Output() update = new EventEmitter<any>();
  onSubmit() {
    if (this.reclamationForm.valid) {

      const reclamationData = this.reclamationForm.value;
      this.updateReclamation(this.reclamation.idReclamation, reclamationData);


    }
  }
  error:string='';
  updateReclamation(id: number, reclamationData: any) {
    this.reclamationService.updateReclamation(id, reclamationData)
      .subscribe({
        next: (u) => {
this.error="";
          this.data.reclamation.titre = this.reclamation.titre;
          this.data.reclamation.description = this.reclamation.description;
          const updatedReclamation = this.reclamationForm.value;
          this.update.emit(updatedReclamation);
          this.dialogRef.close();
        },
        error: (error) => {
          if (error.status === 400) {

            this.error = error.error;
            console.error(this.error);
          } else {

            this.error = 'Erreur lors de l\'ajout de la réclamation';
          }

        }
      });

}
}
