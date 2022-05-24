import { IEmailGuesser } from ".";
import { MissingCompanyError } from '../services'
import express from 'express';

export class EmailGuesserRoutes {
  constructor(private emailGuesser: IEmailGuesser) { }

  /**
   * Defines email guesser routes.
   */
  getRoutes() {
    const router = express.Router();
    router.route('')
      .post((req, res) => {
        try {
          const [fullName] = Object.keys(req.body);
          const companyDomain = req.body[fullName];
          const [first, last] = fullName.split(" ");

          if (!first || !last) {
            return res.status(400).send('First and last name required');
          }

          const derivedMail = this.emailGuesser.deriveEmailAddress(fullName, companyDomain);

          return res
            .status(200)
            .json(derivedMail);
        } catch (error) {
          if (error instanceof MissingCompanyError) {
            return res
              .status(400)
              .send(`No record of same company found`);
          }
          else {
            return res.sendStatus(500);
          }
        }
      });

    return router;
  }
}