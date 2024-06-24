export interface Reclamation {
  titre?:string;
  status?:string;
  date?: Date;
  description?: string;
  idUtilisateur?: string; // Assuming idUtilisateur is a string
  nbreCommande?: number;

}
