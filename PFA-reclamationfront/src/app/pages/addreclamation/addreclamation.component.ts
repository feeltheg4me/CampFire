import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReclamationService} from "../../services/reclamation.service";
import {Reclamation} from "../../models/ajoutreclamation";
import {ImageModel} from "../../models/imageModel";
import {Router} from "@angular/router";

import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-addreclamation',
  templateUrl: './addreclamation.component.html',
  styleUrls: ['./addreclamation.component.scss']
})
export class AddreclamationComponent {
  imageModel: ImageModel = new ImageModel();
  reclamation: Reclamation= {};
  reclamationForm: FormGroup;
  imageToUpload: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder,private reclamationService: ReclamationService,private router:Router) {
    this.reclamationForm = this.fb.group({

        idUtilisateur: ["667746e7e8a884a1f129d4d2", Validators.required], // Assuming a logged-in user with ID666192b1784fb960f946344f

      titre: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date()],
      status:['en attente'],
      nbreCommande:['', Validators.required],
      picture: ['', Validators.required],

    });
  }
  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.imageToUpload = fileList[0];
      this.imageModel= event.target?.files[0];
      this.previewImage(this.imageToUpload); // Call the previewImage method
    }
  }
  message:string ='';
  error:string='';


  onSubmit(): void {
    if (this.reclamationForm.valid && this.imageToUpload) {
      this.reclamation.description = this.reclamationForm.get('description')?.value;
      this.reclamation.titre =this.reclamationForm.get('titre')?.value;
      this.reclamation.date = this.reclamationForm.get('date')?.value;
      this.reclamation.idUtilisateur =this.reclamationForm.get('idUtilisateur')?.value;
      this.reclamation.nbreCommande =this.reclamationForm.get('nbreCommande')?.value;
      this.reclamation.status =this.reclamationForm.get('status')?.value;


   this.reclamationService.ajoutReclamation(this.reclamation,this.imageModel)
     .subscribe({
       next:(response)=>{
         this.error="";
         this.message="Reclamation ajouté avec success";


           setTimeout(()=>{
             this.router.navigate(['home/myclaims']);
           },1000)

       },
       error: (error) => { if (error.status === 400) {
         this.message='';
         this.error = error.error;

       } else {
         this.message='';
         this.error = 'Erreur lors de l\'ajout de la réclamation';
       }
         console.error(error);
       }
     });
    }
  }

}
