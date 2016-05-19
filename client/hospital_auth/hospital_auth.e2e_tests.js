'use strict'
describe('Hospital Auth', () => {
  let navbar = element(by.id('navbar'));
  let time = browser.params.time;

  // signup page
  describe('Signup Page', () => {
    let signupEl = element(by.id('hospital-signup'));
    let emailInputEl = signupEl.element(by.model('HospitalAuthCtrl.signupObj.email'));
    let passwordInputEl = signupEl.element(by.model('HospitalAuthCtrl.signupObj.password'));
    let signupBtnEl = signupEl.element(by.css('.btn.profile-button'));

    beforeEach(() => {
      browser.get('/hospital/signup');
    });
    afterAll(() => {
      element(by.css('[name="logout-btn"]')).click();
    });

    //login link
    describe('Login Link', () => {
      it('should redirect user to login page', () => {
        signupEl.element(by.css('.signup-text'))
          .element(by.css('a')).click(); // hrefs to login page
          browser.getLocationAbsUrl().then(url => {
            expect(url).toEqual('/hospital/login');
          });
      });
    });//end login link

    //signup form
    describe('Signup Form', () => {
      it('should redirect user to hospital profile page on successful signup', () => {
        emailInputEl.sendKeys(`test${time}@test.com`);
        passwordInputEl.sendKeys('test');
        signupBtnEl.click();
        browser.getLocationAbsUrl().then(url => {
          expect(url).toEqual('/hospital/profile');
        });
      });

      it('should not redirect user on unsuccessful signup should', () => {
        emailInputEl.sendKeys(`test${time}@test.com`);
        passwordInputEl.sendKeys('lol');
        signupBtnEl.click();
        browser.getLocationAbsUrl().then(url => {
          expect(url).toEqual('/hospital/signup');
        });
      });
    });//end successful signup
  });//end signup page

  //login page
  describe('Login Page', () => {
    let loginEl = element(by.id('hospital-login'));

    beforeEach(() => {
      browser.get('/hospital/login');
    });

    //signup link
    describe('Signup Link', () => {
      it('should redirect user to signup page', () => {
        loginEl.element(by.css('a')).click(); // hrefs to signup page
        browser.getLocationAbsUrl().then(url => {
          expect(url).toEqual('/hospital/signup');
        });
      });
    });//end signup link

    //successful login
    describe('Login Form', () => {
      let emailInputEl = loginEl.element(by.model('HospitalAuthCtrl.loginObj.email'));
      let passwordInputEl = loginEl.element(by.model('HospitalAuthCtrl.loginObj.password'));
      let loginBtnEl = loginEl.element(by.css('.btn.profile-button'));

      it('should redirect user to profile page on successful login', () => {
        emailInputEl.sendKeys(`test${time}@test.com`);
        passwordInputEl.sendKeys('test');
        loginBtnEl.click();
        browser.getLocationAbsUrl().then(url => {
          expect(url).toEqual('/hospital/profile');
        });
      });

      it('should not redirect user to profile page on unsuccessful', () => {
        emailInputEl.sendKeys(`test${time}@test.com`);
        passwordInputEl.sendKeys('lol');
        loginBtnEl.click();
        browser.getLocationAbsUrl().then(url => {
          expect(url).toEqual('/hospital/login');
        });
      });
    });//end login form
  });//end login page
});
