import { UserCompanyMailFs } from "./../src/integration/index";
import { EmailGuesserService, MissingCompanyError } from "./../src/services/index";

describe('Testing EmailGuesserService', () => {
  const dao = new UserCompanyMailFs();
  const daoSpy = jest.spyOn(dao, 'getAll');
  const service = new EmailGuesserService(dao);

  test('should throw for other domains then google, babbel and linkedin', () => {
    const fullName = 'Stefan Englmeier';
    const companyDomain = 'slideshare.net';

    expect(() => {
      service.deriveEmailAddress(fullName, companyDomain)
    })
      .toThrow(MissingCompanyError)
  });

  test('should call getAll of dao', () => {
    const fullName = 'Stefan Englmeier';
    const companyDomain = 'babbel.com';
    service.deriveEmailAddress(fullName, companyDomain);

    expect(daoSpy).toBeCalled();
  });

  test('should derive an email address for existing company domain', () => {
    const fullName = 'Stefan Englmeier';
    const companyDomain = 'babbel.com';
    const expected = 'senglmeier@babbel.com';

    const result = service.deriveEmailAddress(fullName, companyDomain);
    expect(result).toBeDefined();
    expect(result[fullName]).toBe(expected);
  });
})