import { Router, Request, Response, NextFunction } from 'express';

export class CasUtilisationsRouter {
    private _router: Router;


    get router() {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this.init();
      }

    public loadCasAjouterCours(req: Request, res: Response, next: NextFunction){
        res.status(200).render("casAjouterCours",{
            title: "Ajouter Cours"
        });
    }

    public loadCasRecupererCours(req: Request, res: Response, next: NextFunction){
      res.status(200).render("casRecupererCours",{
          title: "Recuperer cours"
      });
    }

    public loadCasRetirerCours(req: Request, res: Response, next: NextFunction){
      res.status(200).render("casRetirerCours",{
          title: "Retirer cours"
      });
    }
  public loadCasAjouterQuestion(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casAjouterQuestion",{
        title: "Ajouter Question"
    });
  }

  public loadCasRecupererQuestion(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casRecupererQuestion",{
        title: "Recuperer Question"
    });
  }

  public loadCasModifierQuestion(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casModifierQuestion",{
        title: "Modifier Question"
    });
  }
  public loadCasSupprimerQuestion(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casSupprimerQuestion",{
        title: "Supprimer Question"
    });
  }
  public loadCasAjouterQuestionnaire(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casAjouterQuestionnaire",{
        title: "Ajouter Questionnaire"
    });
  }
  public loadCasRecupererQuestionnaire(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casRecupererQuestionnaire",{
        title: "Recuperer Questionnaire"
    });
  }
  public loadCasModifierQuestionnaire(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casModifierQuestionnaire",{
        title: "Modifier Questionnaire"
    });
  }
  public loadCasSupprimerQuestionnaire(req: Request, res: Response, next: NextFunction){
    res.status(200).render("casSupprimerQuestionnaire",{
        title: "Supprimer Questionnaire"
    });
  }
  public loadCasAjouterDevoir(sreq: Request, res: Response, next: NextFunction){
    res.status(200).render("casAjouterDevoir",{
        title: "Ajouter Devoir"
    });
  }

  init() {
    this._router.get('/loadCasAjouterCours', this.loadCasAjouterCours.bind(this)); 
    this._router.get('/loadCasRecupererCours', this.loadCasRecupererCours.bind(this)); 
    this._router.get('/loadCasRetirerCours', this.loadCasRetirerCours.bind(this)); 
    this._router.get('/loadCasAjouterQuestion', this.loadCasAjouterQuestion.bind(this)); 
    this._router.get('/loadCasRecupererQuestion', this.loadCasRecupererQuestion.bind(this)); 
    this._router.get('/loadCasModifierQuestion', this.loadCasModifierQuestion.bind(this)); 
    this._router.get('/loadCasSupprimerQuestion', this.loadCasSupprimerQuestion.bind(this)); 
    this._router.get('/loadCasAjouterQuestionnaire', this.loadCasAjouterQuestionnaire.bind(this)); 
    this._router.get('/loadCasRecupererQuestionnaire', this.loadCasRecupererQuestionnaire.bind(this)); 
    this._router.get('/loadCasModifierQuestionnaire', this.loadCasModifierQuestionnaire.bind(this)); 
    this._router.get('/loadCasSupprimerQuestionnaire', this.loadCasSupprimerQuestionnaire.bind(this)); 
    this._router.get('/loadCasAjouterDevoir', this.loadCasAjouterDevoir.bind(this)); 

  }

}  

export const casUtilisationsRouter = new CasUtilisationsRouter()
casUtilisationsRouter.init()