import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ReclamationService} from "../../services/reclamation.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ModifierreclamationComponent} from "../modifierreclamation/modifierreclamation.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-myclaims',
  templateUrl: './myclaims.component.html',
  styleUrls: ['./myclaims.component.css']
})
export class MyclaimsComponent implements OnInit {
  constructor(private fb: FormBuilder,private reclamationService: ReclamationService,private router:Router,public dialog: MatDialog) {}
  ngOnInit() {

    this. getloggeduserreclamations();

  }
  message:string ='';
  public reclamations:any = [];
  getloggeduserreclamations(){
    const id="667746e7e8a884a1f129d4d2";
    this.reclamationService.getUserLogedReclamations(id).subscribe(
      {
        next:(response)=>{
                 this.message="success"
          this.reclamations =
          this.filteredReclamations = response;
                 console.log(response)
          this.paginateReclamations();


        }
      }
    )

  };
  Ondeletereclamation(id: number | undefined){
    if(id!= null){
      this.reclamationService.deleteReclamation(id).subscribe(
        data => {
          this.filteredReclamations = this.reclamations.filter((reclamation: any) => reclamation.idReclamation !== id);
        },
        error => {
          console.error('Error deleting book:', error);
        }
      );
    }
    this.paginateReclamations();
}
  filteredReclamations:any = [];
  selectedStatus = '';
  filterReclamations() {
    if (this.selectedStatus) {
      this.filteredReclamations = this.reclamations.filter((reclamation: any) => reclamation.status === this.selectedStatus);
    } else {
      this.filteredReclamations = this.reclamations;
    }
    this.paginateReclamations();
  }


  selectedReclamation: any;

  openDialog(reclamation: any) {
    this.selectedReclamation = reclamation;
    const dialogRef = this.dialog.open(ModifierreclamationComponent, {
      width: 'auto', // specify width as per your requirement
      data: { reclamation: reclamation } // pass data to your dialog component if needed
    });
    dialogRef.componentInstance.update.subscribe((updatedReclamation: any) => {
      // Find the index of the updated reclamation in the array
      const index = this.reclamations.findIndex((item: any) => item.idReclamation === updatedReclamation.idReclamation);
      if (index !== -1) {
        // Update the corresponding reclamation in the array
        this.reclamations[index].titre = updatedReclamation.titre;
        this.reclamations[index].description = updatedReclamation.description;

        // Reapply filtering logic if filteredReclamations is derived from reclamations
        if (this.selectedStatus && this.selectedStatus !== "") {
          this.filteredReclamations = this.reclamations.filter((reclamation: any) => reclamation.status === this.selectedStatus);
        } else {
          this.filteredReclamations = this.reclamations;
        }

      }
    });
    this.paginateReclamations();
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
    this.paginateReclamations();
  }


  paginatedReclamations: any = [];
  pageSize = 4;
  currentPage = 0;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateReclamations();
  }

  paginateReclamations() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedReclamations = this.filteredReclamations.slice(startIndex, endIndex);
  }

}
