import { UserCompanyMail } from '../../services/index';

export interface IEmailGuesser {
  deriveEmailAddress: (fullName: string, companyName: string) => UserCompanyMail
}