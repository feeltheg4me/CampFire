import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Reclamation} from "../models/ajoutreclamation";

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor( private http: HttpClient, private router: Router

  )  { }
  private baseUrl : string ='http://localhost:3000/reclamation'
  ajoutReclamation(
    reclamation:Reclamation
    , image:any )
  {
    const formData = new FormData();
    formData.append('titre', reclamation.titre|| '');
    formData.append('status', reclamation.status|| '');

    formData.append('description', reclamation.description|| '');
    formData.append('idUtilisateur', reclamation.idUtilisateur|| '');
    formData.append('nbreCommande', reclamation.nbreCommande != null ? reclamation.nbreCommande.toString() : '');




    if (reclamation.date !== undefined) {
      formData.append('date', reclamation.date.toString());
    }// Ensure proper date format

    formData.append('picture', image);

    return this.http.post<any>(`${this.baseUrl}/add`, formData)
  }

  getAllReclamations() {

    return this.http.get<any>(`${this.baseUrl}/afficher`);
  }
  getUserLogedReclamations(id: string) {

    return this.http.get<any>(`${this.baseUrl}/afficherparutilisateur/${id}`);
  }
  deleteReclamation(id: number) {
    return this.http.delete(`${this.baseUrl}/supprimer/${id}`);
  }
  changeReclamationStatusToTraiter(id: number) {
    return this.http.patch(`${this.baseUrl}/modifierstatus/${id}`, {});
  }
 refuserreclamation(id: number,iduser:any) {
    return this.http.patch(`${this.baseUrl}/refuserreclamation/${id}/${iduser}`, {});
  }
  getreclamationbyid(id: number) {
    return this.http.get<any>(`${this.baseUrl}/aff/${id}`);
  }
  updateReclamation(id: number, reclamationData: any){
    return this.http.patch<any>(`${this.baseUrl}/modifier/${id}`, reclamationData);
  }
  searchReclamations(keyword: string) {
    return this.http.get(`${this.baseUrl}/search`, { params: { keyword } });
  }
  groupbystatus() {
    return this.http.get<any>(`${this.baseUrl}/groupbystatus`, );
  }
  reclamationsByMonth() {
    return this.http.get<any>(`${this.baseUrl}/reclamationsByMonth`, );
  }
  groupbyuser() {
    return this.http.get<any>(`${this.baseUrl}/groupbyuser`, );
  }
  reclamationsCountToday() {
    return this.http.get<any>(`${this.baseUrl}/reclamationsCountToday`, );
  }  reclamationsExceeding3DaysPending() {
    return this.http.get<any>(`${this.baseUrl}/reclamationsExceeding3DaysPending`, );
  }


}
