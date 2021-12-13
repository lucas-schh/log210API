import { Router, Request, Response, NextFunction } from 'express';
import { ControleurDevoir } from '../core/ControleurDevoir';


export class DevoirRouter {
    private _router: Router;
    private _controleur: ControleurDevoir;  // contrôleur GRASP
  
    get controleurQuestion() {
      return this._controleur;
    }
  
    get router() {
      return this._router;
    }
  
    /**
     * Initialiser le router
     */
    constructor() {
      this._controleur = new ControleurDevoir();  // un routeur pointe vers au moins un contrôleur GRASP
      this._router = Router();
      this.init();
    }

    public postCoursSelectionne(req: Request, res: Response, next: NextFunction){
        let data = Array.from(this._controleur.postCoursSelectionne(
            req.query.group_id as string,
            req.query.token as string,
        ).values());
        res.status(200)
        .send({
            message: 'Success',
            status: res.status,
            listeDevoir: data
        });
    }

    public addDevoir(req: Request, res: Response, next: NextFunction){
      let etatVisible = false
      if(req.query.etatVisible == "visible" || req.query.etatVisible == "true"){
        etatVisible = true;
      }
        let data = this._controleur.addDevoir(
            req.query.group_id as string,
            req.query.nom as string,
            req.query.description as string,
            req.query.dateDebut as string,
            req.query.dateFin as string,
            req.query.noteMaximale as any,
            etatVisible,
            req.query.token as string,
        )
        res.status(200)
        .send({
            message: 'Success',
            status: res.status,
        });
    }





    init() {
        this._router.get('/postCoursSelectionne', this.postCoursSelectionne.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342
        this._router.get('/addDevoir', this.addDevoir.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342

      }

}
export const devoirRouter = new DevoirRouter();
devoirRouter.init();
