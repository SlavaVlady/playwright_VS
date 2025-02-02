import { test, expect } from '@playwright/test';
import HomePage from '../page-object/pages/HomePage';
import SignUpForm from '../page-object/forms/SignUpForm';
import { defineConfig } from '@playwright/test';

function generateRandomEmail(): string {
    return `test${Math.floor(Math.random() * 100000)}vs@mailinator.com`;
}

const randomEmail = generateRandomEmail();

test.describe('Sign UP tests with POM', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);

        await homePage.openPage();
        await homePage.openSignUpForm();
    });

    test('should show an error for a name with 1 character', async () => {
        await signUpForm.validateNameLength('A');
        await expect(signUpForm.form.locator('body')).toContainText('Name has to be from 2 to 20 characters long');
        await expect(signUpForm.registerButton).toBeDisabled();
    });
    test('should show an error for a name with 21 characters', async () => {
        await signUpForm.validateNameLength('A'.repeat(21));
        await expect(signUpForm.form.locator('body')).toContainText('Name has to be from 2 to 20 characters long');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    test('should show an error for a name with only numbers', async () => {
        await signUpForm.validateNameLength('12345');
        await expect(signUpForm.form.locator('body')).toContainText('Name is invalid');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for a last name with 1 character', async () => {
        await signUpForm.validateLastNameLength('T');
        await expect(signUpForm.form.locator('body')).toContainText('Last name has to be from 2 to 20 characters long');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for a last name with 21 characters', async () => {
        await signUpForm.validateLastNameLength('T'.repeat(21));
        await expect(signUpForm.form.locator('body')).toContainText('Last name has to be from 2 to 20 characters long');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for a last name with only numbers', async () => {
        await signUpForm.validateLastNameLength('12345');
        await expect(signUpForm.form.locator('body')).toContainText('Last name is invalid');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for an invalid email', async () => {
        await signUpForm.fillName('Vlada');
        await signUpForm.fillLastName('Test');
        await signUpForm.fillEmail('invalid-email');
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupEmailField);
        await expect(signUpForm.form.locator('body')).toContainText('Email is incorrect');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for a password with 7 characters', async () => {
        await signUpForm.fillName('Vlada');
        await signUpForm.fillLastName('Test');
        await signUpForm.fillEmail(randomEmail);
        await signUpForm.fillPassword('1234567');
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupPasswordField);
        await expect(signUpForm.form.locator('body')).toContainText('Password has to be from 8 to 15 characters long');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for mismatched passwords', async () => {
        await signUpForm.fillName('Vlada');
        await signUpForm.fillLastName('Test');
        await signUpForm.fillEmail(randomEmail);
        await signUpForm.fillPassword('Test1234!');
        await signUpForm.fillRepeatPassword('Different123!');
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupRepeatPasswordField);
        await expect(signUpForm.form.locator('body')).toContainText('Passwords do not match');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for an empty last name', async () => {
        await signUpForm.fillName('Test');
        await signUpForm.signupLastName.focus();
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupLastName);
        await expect(signUpForm.form.locator('body')).toContainText('Last name required');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for an empty name', async () => {
        await signUpForm.signupName.focus();
        await signUpForm.fillLastName('Test');
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupName);
        await expect(signUpForm.form.locator('body')).toContainText('Name required');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for an empty email', async () => {
        await signUpForm.fillName('Vlada');
        await signUpForm.fillLastName('Test');
        await signUpForm.signupEmailField.focus();
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupEmailField);
        await expect(signUpForm.form.locator('body')).toContainText('Email required');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for an empty repeat password field', async () => {
        await signUpForm.fillName('Vlada');
        await signUpForm.fillLastName('Test');
        await signUpForm.fillEmail(randomEmail);
        await signUpForm.fillPassword('Test1234!');
        await signUpForm.signupRepeatPasswordField.focus();
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupRepeatPasswordField);
        await expect(signUpForm.form.locator('body')).toContainText('Re-enter password required');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('should show an error for an empty password', async () => {
        await signUpForm.fillName('Vlada');
        await signUpForm.fillLastName('Test');
        await signUpForm.fillEmail(randomEmail);
        await signUpForm.signupPasswordField.focus();
        await signUpForm.triggerValidationErrorOnField(signUpForm.signupPasswordField);
        await expect(signUpForm.form.locator('body')).toContainText('Password required');
        await expect(signUpForm.registerButton).toBeDisabled();
      });
    
    test('Success Sign Up', async () => {
        await signUpForm.fillName('Vlada');
        await signUpForm.fillLastName('test');
        await signUpForm.fillEmail(randomEmail);
        await signUpForm.fillPassword('Test1234!');
        await signUpForm.fillRepeatPassword('Test1234!');
        await signUpForm.submitForm();
        await expect(signUpForm.form).toHaveURL('/panel/garage');
      });
    
});

