import { Locator, Page } from "@playwright/test";

export default class SignInForm {
  readonly form: Page;
  readonly signinEmailField: Locator;
  readonly signinPasswordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.form = page;
    this.signinEmailField = page.locator('#signinEmail');
    this.signinPasswordField = page.locator('#signinPassword');
    this.loginButton = page.locator('//div[@class="modal-content"]//button[contains(@class, "btn-primary")]');
}

async enterEmail(email:string) {
    await this.signinEmailField. fill (email);

}

async enterPassword (password: string) {
    await this.signinPasswordField.fill(password);
}

async clickloginButton () {
    await this.loginButton.click();
}
async loginWithCredentials(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickloginButton();
}
}