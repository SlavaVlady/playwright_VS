import { test, expect, Locator } from '@playwright/test';
import { error } from 'console';

test.describe('Test Cases for Registration Page', () => {
  let signupName: Locator;
  let signupLastName: Locator;
  let signupEmail: Locator;
  let signupPassword: Locator;
  let signupRepeatPassword: Locator;
  let registerButton: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
    const signUpbutton = page.locator('text="Sign up"');
    await signUpbutton.click(); 

    signupName = page.locator('#signupName');
    signupLastName = page.locator('#signupLastName');
    signupEmail = page.locator('#signupEmail');
    signupPassword = page.locator('#signupPassword');
    signupRepeatPassword = page.locator('#signupRepeatPassword');
    registerButton = page.locator('text="Register"');
  });
  function generateRandomEmail(): string {
    return `test${Math.floor(Math.random() * 100000)}vs@mailinator.com`;
  }
  const randomEmail = generateRandomEmail()

 

  test('should show an error for a name with 1 character', async ({ page }) => { 
    await signupName.fill('A');
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Name has to be from 2 to 20 characters long');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for a name with 21 characters', async ({ page }) => {
    await signupName.fill('A'.repeat(21));
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Name has to be from 2 to 20 characters long');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for a name with only numbers', async ({ page }) => {
    await signupName.fill('12345');
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Name is invalid');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for a last name with 1 character', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('T');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for a last name with 21 characters', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('T'.repeat(21));
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for a last name with only numbers', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('12345');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Last name is invalid');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for an invalid email', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('Test');
    await signupEmail.fill('invalid-email');
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Email is incorrect');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for a password with 7 characters', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('1234567');
    await signupRepeatPassword.fill('1234567');
    await expect(page.locator('body')).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for a password with 16 characters', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!Test1234');
    await signupRepeatPassword.fill('Test1234!Test1234');
    await expect(page.locator('body')).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error when passwords do not match', async ({ page }) => {
    const password = 'Test1234!';
    const repeatPassword = 'Different123!';
    await signupName.fill('Vlada');
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill(password);
    await signupRepeatPassword.fill(repeatPassword);
    await signupName.focus();
    await expect(page.locator('body')).toContainText('Passwords do not match');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for an empty last name', async ({ page }) => {
    await signupName.fill('Test');
    await signupLastName.focus();
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Last name required');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for an empty name', async ({ page }) => {
    await signupName.focus();
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Name required');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for an empty email', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('Test');
    await signupEmail.focus();
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Email required');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for an empty repeat password field', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.focus();
    await signupPassword.focus();
    await expect(page.locator('body')).toContainText('Re-enter password required');
    await expect(registerButton).toBeDisabled();
  });

  test('should show an error for an empty password', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('Test');
    await signupEmail.fill(randomEmail);
    await signupPassword.focus();
    await signupRepeatPassword.fill('Test1234!');
    await expect(page.locator('body')).toContainText('Password required');
    await expect(registerButton).toBeDisabled();
  });

  test('Success Sign Up', async ({ page }) => {
    await signupName.fill('Vlada');
    await signupLastName.fill('test');
    await signupEmail.fill(randomEmail);
    await signupPassword.fill('Test1234!');
    await signupRepeatPassword.fill('Test1234!');
    await registerButton.click();
    await expect(page).toHaveURL('/panel/garage');
  });
});



  