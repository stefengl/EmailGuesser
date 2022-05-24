import React, { FormEvent } from 'react';
import { deriveEmail } from './api/Api';
import './App.css';
import { UserCompanyMail } from './models/UserCompanyMail';

export type AppProps = {};
export type AppState = {
  fullName: string,
  companyDomain: string,
  derivedMail?: UserCompanyMail,
  hasError?: boolean,
  errMsg?: string
};
export class App extends React.Component<AppProps, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      fullName: '',
      companyDomain: ''
    }
  }

  async handleSubmit(e: FormEvent) {
    e.preventDefault();
    this.setState({
      hasError: false,
      derivedMail: undefined,
      errMsg: undefined
    });
    const { fullName, companyDomain } = this.state;
    try {
      const derivedMail = await deriveEmail(fullName, companyDomain);
      this.setState({ derivedMail });
    }
    catch ({ message }) {
      this.setState({
        hasError: true,
        errMsg: message as string
      })
    }
  }

  handleInputChange(name: string, e: React.ChangeEvent<HTMLInputElement>) {
    this.setState(prev => ({ ...prev, [name]: e.target.value }));
  }

  render() {
    let emailDisplay: JSX.Element | undefined;

    if (this.state.derivedMail) {
      const [fullName] = Object.keys(this.state.derivedMail);
      const email = this.state.derivedMail[fullName];
      emailDisplay = (<p>Your email: {email}</p>)
    }

    return (
      <div className="app" >
        <header className="app-header">
          <h1 className="app-header-headline">Email Guesser</h1>
          <h3 className="app-header-subtitle">Stefan Englmeier</h3>
        </header>
        <section className="app-content">
          <div className="app-email-guess-form-wrapper">
            <form className="app-email-guess-form" onSubmit={e => this.handleSubmit(e)}>
              <label htmlFor="app-fullname-input">Full name</label>
              <input id="app-fullname-input" type="text" onChange={e => this.handleInputChange('fullName', e)} placeholder='i.e. Stefan Englmeier' required />
              <label htmlFor="app-company-domain-input">Company domain</label>
              <input id="app-company-domain-input" type="text" onChange={e => this.handleInputChange('companyDomain', e)} placeholder='i.e. @babbel.com' required />
              <button type='submit'>Send</button>
            </form>
            {this.state.derivedMail && (emailDisplay)}
            {this.state.hasError && (<p>Sorry - we can not guess your email!</p>)}
            {this.state.errMsg && (<p className="app-error-message">{this.state.errMsg}</p>)}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
