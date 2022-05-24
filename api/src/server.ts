import express from 'express';
import { UserCompanyMailFs } from './integration';
import { EmailGuesserRoutes } from './routes';
import { EmailGuesserService } from './services';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const emailGuesserRoutes = new EmailGuesserRoutes(
  new EmailGuesserService(
    new UserCompanyMailFs()));

app.use('', emailGuesserRoutes.getRoutes())


app.listen(port, () => {
  console.log('[API] - Email guesser started on port ' + port);
});