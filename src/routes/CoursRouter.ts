import { Router, Request, Response, NextFunction } from 'express';
import { ControleurCours } from '../core/ControleurCours';

export class CoursRouter {
  private _router: Router;
  private _controleur: ControleurCours;  // contrôleur GRASP

  get controleurCours() {
    return this._controleur;
  }

  get router() {
    return this._router;
  }

  /**
   * Initialiser le router
   */
  constructor() {
    this._controleur = new ControleurCours();  // un routeur pointe vers au moins un contrôleur GRASP
    this._router = Router();
    this.init();
  }
  
  public async getInfoGroupeCours(req: Request, res: Response, next: NextFunction) {
    
    let data = await this._controleur.getInfoGroupeCours(
      req.query.group_id as string,
      req.query.token as string
      );
    res.status(201)
      .send({
        message: 'Success',
        status: res.status,
        cours: data
      });
  }





  public async getGroupeCoursSGB(req: Request, res: Response, next: NextFunction) {
    let data = await this._controleur.getGroupeCoursSGB(
      req.query.token as string
    );
    res.status(201)
    .send({
      message: 'Success',
      status: res.status,
      listeGroupeCours: data
    });
  }

  public async recupererEtudiantsGroupeCours(req: Request, res: Response, next: NextFunction){
    let data = await this._controleur.recupererEtudiantsGroupeCours(
      req.query.group_id as string,
      req.query.token as string
      );
    res.status(201).send({
      message: 'Success',
      status: res.status,
      listeEtudiants: data
    });
  }

  public addCours(req: Request, res: Response, next: NextFunction){
    let data = this._controleur.addCours(
      req.query.group_id as any,
      req.query.listeEtudiants as any,
      req.query.token as string);
    res.status(201).send({
      message: 'Success',
      status: res.status,
      });
  }
  public getCoursUtilisateur(req: Request, res: Response, next: NextFunction){
    let data = Array.from(this._controleur.getCoursUtilisateur(
      req.query.token as string
    ).values());
    res.status(201).send({
      message: 'Success',
      status: res.status,
      listeCours: data
      });
  }

  public deleteCoursChoisi(req: Request, res: Response, next: NextFunction){
    let data = Array.from(this._controleur.deleteCoursChoisi(
      req.query.group_id as any,
      req.query.token as string
      ).values());
    res.status(201).send({
      message: 'Success',
      status: res.status,
      listeCours : data
      });
  }





  /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
  init() {
    this._router.get('/getInfoGroupeCours', this.getInfoGroupeCours.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342
    this._router.get('/getGroupeCoursSGB', this.getGroupeCoursSGB.bind(this)); 
    this._router.get('/recupererEtudiantsGroupeCours', this.recupererEtudiantsGroupeCours.bind(this)); 
    this._router.get('/addCours', this.addCours.bind(this)); 
    this._router.get('/getCoursUtilisateur', this.getCoursUtilisateur.bind(this)); 
    this._router.get('/deleteCoursChoisi', this.deleteCoursChoisi.bind(this)); 

  }
}

// exporter its configured Express.Router
export const coursRouter = new CoursRouter();
coursRouter.init();
