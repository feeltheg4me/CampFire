import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReclamationService} from "../../services/reclamation.service";

@Component({
  selector: 'app-reclamationdetails',
  templateUrl: './reclamationdetails.component.html',
  styleUrls: ['./reclamationdetails.component.css']
})
export class ReclamationdetailsComponent implements OnInit {
  reclamation: any;
  reclamationId:any;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService
  ) { }

  ngOnInit(): void {
    this.reclamationId = this.route.snapshot.paramMap.get('id');
    this.getReclamation();
  }

  getReclamation(): void {
    this.reclamationService.getreclamationbyid(this.reclamationId)
      .subscribe(
        data => {
          this.reclamation = data;
        },
        error => {
          console.error('Error fetching reclamation:', error);
        }
      );
  }

}
