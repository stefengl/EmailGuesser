import { IEmailGuesser } from 'src/routes';
import {
  IUserCompanyMailDAO,
  UserCompanyMail,
  MissingCompanyError,
  EmailVariant,
  UnsupportedEmailVariant
}
  from './index';

export class EmailGuesserService implements IEmailGuesser {

  constructor(private readonly userCompanyMailDao: IUserCompanyMailDAO) { }

  /**
   * Derives email address for a company user based on existing entities.
   * @param fullName 
   * @param companyDomain 
   * @returns 
   */
  deriveEmailAddress(fullName: string, companyDomain: string) {
    const userCompanyMails = this.userCompanyMailDao.getAll();
    const entityOfSameCompany = this.findSameCompanyUser(companyDomain, userCompanyMails)

    if (!entityOfSameCompany) {
      throw new MissingCompanyError();
    }

    const emailVariant = this.getEmailVariant(entityOfSameCompany);
    const email = this.createMail(fullName, companyDomain, emailVariant);

    return { [fullName]: email };
  }

  /**
   * Creates a new email from a full name and company name in a specific variant
   * @private
   */
  private createMail(fullName: string, companyDomain: string, variant: EmailVariant) {
    const userName = this.createUserName(fullName, variant);
    const domain = '@' + companyDomain.toLowerCase();

    return userName + domain;
  }

  /**
   * Creates the user name part of an email address.
   * @private
   */
  private createUserName(fullName: string, variant: EmailVariant) {
    const [firstName, lastName] = fullName.toLowerCase().split(' ');

    if (EmailVariant.FirstNameLastName === variant) {
      return firstName + lastName;
    }
    else if (EmailVariant.FirstInitialLastName == variant) {
      return firstName[0] + lastName;
    }
    else {
      throw new Error(`Variant ${variant} is not supported or does not exist`)
    }
  }

  /**
   * Identifies the email variant of a user company mail.
   * @private  
   */
  private getEmailVariant(userCompanyMail: UserCompanyMail): EmailVariant {
    const [fullName] = Object.keys(userCompanyMail);
    const mail = userCompanyMail[fullName];
    const [userName] = mail.split('@');

    if (userName === this.createUserName(fullName, EmailVariant.FirstNameLastName)) {
      return EmailVariant.FirstNameLastName;
    }
    else if (userName === this.createUserName(fullName, EmailVariant.FirstInitialLastName)) {
      return EmailVariant.FirstInitialLastName;
    }
    else {
      throw new UnsupportedEmailVariant();
    }
  }

  /**
   *
   * Finds first user company mail that matches a specific company domain.
   * @private
   */
  private findSameCompanyUser(companyDomain: string, userCompanyMails: UserCompanyMail[]): UserCompanyMail {
    return userCompanyMails.find(userCompanyMail => {
      const [fullName] = Object.keys(userCompanyMail);
      const [_, domain] = userCompanyMail[fullName].split('@');

      return companyDomain === domain;
    })
  }

}