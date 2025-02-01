import { Locator, Page } from "@playwright/test";

export default class HomePage {
    static openSignInForm() {
        throw new Error('Method not implemented.');
    }
    readonly page: Page;
    readonly signInButton: Locator;
    readonly signUpButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('//*[contains(@class, "header_signin")]');
        this.signUpButton  = page.locator('text="Sign up"');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
    async openSignUpForm() {
        await this.signUpButton.click();
    }

    async openPage() {
        await this.page.goto('/');
    }
    async logout() {
        await this.page.click('button[aria-label="Logout"]');
        await this.page.waitForURL('https://qauto.forstudy.space/');
      }

}