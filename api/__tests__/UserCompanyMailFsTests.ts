import { UserCompanyMailFs } from "./../src/integration/index"

describe('Testing UserCompanyMailFs', () => {
  const userCompanyMailFs = new UserCompanyMailFs();

  test('getAll', () => {
    const userCompanyMails = userCompanyMailFs.getAll();
    expect(userCompanyMails).toBeTruthy();
    expect(userCompanyMails.length).toBe(6);
  })
})