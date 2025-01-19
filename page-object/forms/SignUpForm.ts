import { Locator, Page } from "@playwright/test";

export default class SignUpForm {
  static registerButton(registerButton: any) {
      throw new Error('Method not implemented.');
  }
  static form: any;
  static validateNameLength(arg0: string) {
      throw new Error('Method not implemented.');
  }
  readonly form: Page;
  readonly signUpButton: Locator;
  readonly signupName: Locator;
  readonly signupLastName: Locator;
  readonly signupEmailField: Locator;
  readonly signupPasswordField: Locator;
  readonly signupRepeatPasswordField: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.form = page;
    this.signUpButton = page.locator('#signupName');
    this.signupName = page.locator('#signupName');
    this.signupLastName = page.locator('#signupLastName');
    this.signupEmailField = page.locator('#signupEmail');
    this.signupPasswordField = page.locator('#signupPassword');
    this.signupRepeatPasswordField = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('text="Register"');
  }

  async fillName(name: string) {
    await this.signupName.fill(name);
  }

  async fillLastName(lastName: string) {
    await this.signupLastName.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.signupEmailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.signupPasswordField.fill(password);
  }

  async fillRepeatPassword(repeatPassword: string) {
    await this.signupRepeatPasswordField.fill(repeatPassword);
  }

  async submitForm() {
    await this.registerButton.click();
  }

  async triggerValidationErrorOnField(field: Locator) {
    await field.focus();
    await field.blur();
  }

  async validateNameLength(name: string) {
    await this.fillName(name);
    await this.triggerValidationErrorOnField(this.signupName);
  }

  async validateLastNameLength(lastName: string) {
    await this.fillLastName(lastName);
    await this.triggerValidationErrorOnField(this.signupLastName);
  }

  async validatePasswordMismatch(password: string, repeatPassword: string) {
    await this.fillPassword(password);
    await this.fillRepeatPassword(repeatPassword);
    await this.triggerValidationErrorOnField(this.signupRepeatPasswordField);
  }
}

