import { Router, Request, Response, NextFunction } from 'express';
import { ControleurQuestionnaire } from '../core/ControleurQuestionnaire';
import App from '../app';

export class QuestionnaireRouter {
  private _router: Router;
  private _controleur: ControleurQuestionnaire;  // contrôleur GRASP


  get ControleurQuestionnaire() {
    return this._controleur;
  }

  get router() {
    return this._router;
  }

  constructor() {
    this._controleur = new ControleurQuestionnaire();  // un routeur pointe vers au moins un contrôleur GRASP
    this._router = Router();
    this.init();
  }

  public async postCoursSelectionneQuestionnaire(req: Request, res: Response, next: NextFunction) {
    let data = Array.from(await this._controleur.postCoursSelectionneQuestionnaire(
    req.query.group_id as string,
    req.query.token as string
    ).values());
    res.status(201)
      .send({
      message: 'Success',
      status: res.status,
      listeQuestionnaire: data,
      });
  }


  public async createQuestionnaire(req: Request, res: Response, next: NextFunction) {
    let etat = false;
    if(req.query.etatActif == "Actif" || req.query.etatActif == "true"){
      etat = true
    }
      let data = await this._controleur.createQuestionnaire(
        req.query.group_id as string,
        req.query.nom as string,
        req.query.description as string,
        etat as any,
        req.query.token as string
      );
      res.status(201)
      .send({
      message: 'Success',
      status: res.status,
      messageaafficher: data,
      });
  }

  public async postTypeQuestion(req: Request, res: Response, next: NextFunction) {
    let data = await this._controleur.postTypeQuestion(
      req.query.group_id as string,
      req.query.typeSelectionne as string,
      req.query.token as string
    );
    res.status(201)
    .send({
    message: 'Success',
    status: res.status,
    listeTypeSelectionne: data,
    });
}

public async postQuestionnaireSelectionne(req: Request, res: Response, next: NextFunction) {
    let data = await this._controleur.postQuestionnaireSelectionne(
      req.query.group_id as string,
      req.query.questionnaireSelectionne as string,
      req.query.token as string
    );
    res.status(201)
    .send({
    message: 'Success',
    status: res.status,
    questionnaire: data,
    });
}

public async addQuestion(req: Request, res: Response, next: NextFunction) {
  let data = await this._controleur.addQuestion(
    req.query.group_id as string,
    req.query.listeQuestions as any,
    req.query.questionnaire as string,
    req.query.token as string
  );
  res.status(201)
  .send({
  message: 'Success',
  status: res.status,
  messageaafficher: data
  });
}

public async modifierQuestionnaire(req: Request, res: Response, next: NextFunction) {
  let data = await this._controleur.modifierQuestionnaire(
    req.query.group_id as string,
    req.query.nomQuestionnaire as string,
    req.query.nouveauNomQuestionnaire as string,
    req.query.nouvelleDescriptionQuestionnaire as string,
    req.query.nouveauEtatActif as any,
    req.query.nouvelleListeQuestion as any,
    req.query.token as string
  );
  res.status(201)
  .send({
  message: 'Success',
  status: res.status,
  messageaafficher: data,
  });
}

public async supprimerQuestionnaire(req: Request, res: Response, next: NextFunction) {
  let data = await this._controleur.supprimerQuestionnaire(
    req.query.group_id as string,
    req.query.nomQuestionnaire as string,
    req.query.token as string
  );
  res.status(201)
  .send({
  message: 'Success',
  status: res.status,
  messageaafficher: data,
  });
}

  init() {
      this._router.get('/postCoursSelectionneQuestionnaire', this.postCoursSelectionneQuestionnaire.bind(this)); 
      this._router.get('/createQuestionnaire', this.createQuestionnaire.bind(this));
      this._router.get('/postTypeQuestion', this.postTypeQuestion.bind(this)); 
      this._router.get('/addQuestion', this.addQuestion.bind(this));
      this._router.get('/postQuestionnaireSelectionne', this.postQuestionnaireSelectionne.bind(this));
      this._router.get('/modifierQuestionnaire', this.modifierQuestionnaire.bind(this));
      this._router.get('/supprimerQuestionnaire', this.supprimerQuestionnaire.bind(this));

    }
}

export const questionnaireRouter = new QuestionnaireRouter();
questionnaireRouter.init();