import { Router, Request, Response, NextFunction } from 'express';
import { ControleurQuestion } from '../core/ControleurQuestion';

export class QuestionRouter {
  private _router: Router;
  private _controleur: ControleurQuestion;  // contrôleur GRASP

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
    this._controleur = new ControleurQuestion();  // un routeur pointe vers au moins un contrôleur GRASP
    this._router = Router();
    this.init();
  }


  public postCoursSelectionne(req: Request, res: Response, next: NextFunction) {
    const listeQuestions = this._controleur.postCoursSelectionne(
      req.query.group_id as string,
      req.query.token as string
      );
    res.status(200)
      .send({
        message: 'Success',
        status: res.status,
        questions: listeQuestions
      });
  }

  public setQuestion(req: Request, res: Response, next: NextFunction) {
    const query = req.query;
    let verite;
    if (query.verite as string === 'vrai' || query.verite as string === 'true') {
        verite = true;
    } else {
        verite = false;
    }

    this._controleur.setQuestion(req.query.cours as string,req.query.type as string,req.query.tags as string,req.query.nom as string,
      req.query.enonce as string,verite,req.query.retroaction_reponse_vrai as string,
      req.query.retroaction_reponse_fausse as string,
      req.query.token as string
      )
      res.status(201)
      .send({
        message: 'Success',
        status: res.status
      });
  }

  public modifierQuestion(req: Request, res: Response, next: NextFunction) {
    let verite;
    if (req.query.verite as string == 'Vrai' || req.query.verite as string == 'true') {
        verite = true;
    } else {
        verite = false;
    }

    this._controleur.modifierQuestion(req.query.questionOriginale as string, req.query.type as string,req.query.tags as string,req.query.nom as string,
      req.query.enonce as string,verite,req.query.retroaction_reponse_vrai as string,
      req.query.retroaction_reponse_fausse as string,
      req.query.token as string
      )
      res.status(201)
      .send({
        message: 'Success',
        status: res.status
      });
  }

  public supprimerQuestion(req: Request, res: Response, next: NextFunction){
    this._controleur.supprimerQuestion(req.query.nomQuestion as string, req.query.token as string)
    res.status(201)
    .send({
      message: 'Success',
      status: res.status
    });
  }

  /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
  init() {
    this._router.get('/postCoursSelectionne', this.postCoursSelectionne.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342
    this._router.get('/setQuestion', this.setQuestion.bind(this));
    this._router.get('/modifierQuestion', this.modifierQuestion.bind(this));
    this._router.get('/supprimerQuestion', this.supprimerQuestion.bind(this));

  }
}

// exporter its configured Express.Router
export const questionRouter = new QuestionRouter();
questionRouter.init();
