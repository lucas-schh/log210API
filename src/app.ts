import express from 'express';
import ExpressSession from 'express-session';
import logger from 'morgan';
import flash from 'express-flash-plus';

import { coursRouter } from './routes/CoursRouter';
import { enseignantRouter } from './routes/EnseignantRouter';
import { questionRouter } from './routes/QuestionRouter';
import { questionnaireRouter } from './routes/QuestionnaireRouter';
import { casUtilisationsRouter } from './routes/casUtilisationsRouter';
import { devoirRouter } from './routes/DevoirRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.expressApp.set('view engine', 'pug');
    this.expressApp.use(express.static(__dirname + '/public') as express.RequestHandler); // https://expressjs.com/en/starter/static-files.html
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev') as express.RequestHandler);
    this.expressApp.use(express.json() as express.RequestHandler);
    this.expressApp.use(express.urlencoded({ extended: false }) as express.RequestHandler);
    this.expressApp.use(ExpressSession(
      {
        secret: 'My Secret Key',
        resave: false,
        saveUninitialized: true
      }));
    this.expressApp.use(flash());
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.render('authentification', { title: 'SGA', messageErreur : ""});
    });

    this.expressApp.use('/', router);  // routage de base

    this.expressApp.use('/api/sga/cours', coursRouter.router);  // tous les URI pour le scénario jeu (DSS) commencent ainsi
    this.expressApp.use('/api/sga/enseignant', enseignantRouter.router);  // tous les URI pour le scénario jeu (DSS) commencent ainsi
    this.expressApp.use('/api/sga/question', questionRouter.router);
    this.expressApp.use('/api/sga/questionnaire', questionnaireRouter.router);
    this.expressApp.use('/api/sga/devoir', devoirRouter.router)
    this.expressApp.use('/api/sga/casUtilisations', casUtilisationsRouter.router)
  }

}

export default new App().expressApp;

