import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReclamationService} from "../../services/reclamation.service";
import {Router} from "@angular/router";
import {Reclamation} from "../../models/ajoutreclamation";

@Component({
  selector: 'app-gererreclamation',
  templateUrl: './gererreclamation.component.html',
  styleUrls: ['./gererreclamation.component.css']
})
export class GererreclamationComponent implements OnInit  {
  ngOnInit() {

    this.getAllReclamations();}

  constructor(private reclamationService: ReclamationService,
              private router:Router,


  ){



  }
  message:any='';
  error:string='';
  public reclamations:any = [];
  getAllReclamations(){
    this.reclamationService.getAllReclamations().subscribe(
      {
        next:(response)=>{

          this.reclamations =this.filteredReclamations= response;
          console.log(response)


        }
      }
    )
  };
  filteredReclamations:any = [];
  selectedStatus = '';
  filterReclamations() {
    if (this.selectedStatus) {
      this.filteredReclamations = this.reclamations.filter((reclamation: any) => reclamation.status === this.selectedStatus);
    } else {
      this.filteredReclamations = this.reclamations;
    }

  }

  searchKeyword: string = '';
  searchReclamations() {

    if (this.searchKeyword) {
      this.reclamationService.searchReclamations(this.searchKeyword).subscribe(
        (response:any) => {
          if (this.selectedStatus) {
            this.filteredReclamations = response.filter((reclamation: any) => reclamation.status === this.selectedStatus);
          } else {
            this.filteredReclamations = response;
          }

        },
        (error) => {
          console.error('Error searching reclamations:', error);
          this.filteredReclamations =[];
        }
      );
    } else {
      if (this.selectedStatus && this.selectedStatus !== "") {
        this.filteredReclamations = this.reclamations.filter((reclamation: any) => reclamation.status === this.selectedStatus);
      } else {
        this.filteredReclamations = this.reclamations;
      }
    }

  }
  changereclamationstatus(id:number){
    this.reclamationService.changeReclamationStatusToTraiter(id).subscribe(
      {
        next:(response)=>{


 this.message="reclamation accepter"
          this.getAllReclamations(); // Refresh the table

        }
      }
    )
  };
  refuserreclamation(id:number,iduser:any){
    this.reclamationService.refuserreclamation(id,iduser).subscribe(
      {


          next: (response: any) => {
            if (response.message === 'user deleted with his claims') {
              this.message = "Utilisateur supprimé avec ses réclamations.";
            } else {
              this.message = "Réclamation refusée.";
            }
          this.getAllReclamations(); // Refresh the table


        }
      }
    )
  };
  goToDetails(id: number): void {
    this.router.navigate(['admin/reclamation', id]);
  }
}
