import { Router, Request, Response, NextFunction } from 'express';
import { ControleurEnseignant } from '../core/ControleurEnseignant';
import App from '../app';

export class EnseignantRouter {
  private _router: Router;
  private _controleur: ControleurEnseignant;  // contrôleur GRASP


  get controleurEnseignant() {
    return this._controleur;
  }

  get router() {
    return this._router;
  }

  constructor() {
    this._controleur = new ControleurEnseignant();  // un routeur pointe vers au moins un contrôleur GRASP
    this._router = Router();
    this.init();
  }

  public async authEnseignant(req: Request, res: Response, next: NextFunction) {
    try{
      let data = await this._controleur.authEnseignant(
      req.params.email as string,
      req.params.password as string
    );
      res.cookie("token", data.token);
      res.status(200).render("casUtilisations",{
        title: "Cas Utilisation"
        });
    }
    catch{
      res.status(200).render("authentification",{
        title: "Authentification",
        messageErreur : "Veuillez entrer un compte enseignant valide"
        });
    }

  }


  public async recupererEnseignantAvecToken(req: Request, res: Response, next: NextFunction) {
      let data = await this._controleur.recupererEnseignantAvecToken(
      req.query.token as string
      );
      res.status(201)
      .send({
      message: 'Success',
      status: res.status,
      id: data
      });
  }

  init() {
      this._router.get('/authEnseignant/:email/:password', this.authEnseignant.bind(this)); 
      this._router.get('/recupererEnseignantAvecToken', this.recupererEnseignantAvecToken.bind(this)); 
  
    }
}

export const enseignantRouter = new EnseignantRouter();
enseignantRouter.init();
