import { IUserCompanyMailDAO, UserCompanyMail } from "src/services/index";

export class UserCompanyMailFs implements IUserCompanyMailDAO {
  private userCompanyMails: UserCompanyMail[] = [
    { 'Jane Doe': 'jdoe@babbel.com' },
    { 'Jay Arun': 'jayarun@linkedin.com' },
    { 'David Stein': 'davidstein@google.com' },
    { 'Mat Lee': 'matlee@google.com' },
    { 'Marta Dahl': 'mdahl@babbel.com' },
    { 'Vanessa Boom': 'vboom@babbel.com' }
  ];

  getAll = () => this.userCompanyMails;
}