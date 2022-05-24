import { UserCompanyMail } from "../models/UserCompanyMail";

/**
 * HTTP POST requests api to attempt to derive the email of company user. 
 */
export const deriveEmail = async (fullName: string, companyDomain: string): Promise<UserCompanyMail> => {
  const body = JSON.stringify({ [`${fullName}`]: companyDomain });
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  const result = await fetch('', {
    method: 'POST',
    headers,
    body
  })

  if (!result.ok) {
    return Promise.reject(new Error(await result.text()))
  }

  return result.json();
}