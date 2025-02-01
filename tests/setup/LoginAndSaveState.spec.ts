import { test, expect } from '@playwright/test';
import HomePage from '../../page-object/pages/HomePage';
import SignInForm from '../../page-object/forms/SignInForm';
import { defineConfig } from '@playwright/test';

test.describe(('Set Up users'), () =>{
    let homePage: HomePage;
    let signInForm:SignInForm;

test.beforeEach(async ({page}) =>{
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    await page.goto('/');
    await homePage.openPage ();
    await homePage. openSignInForm(); 
})

test('Sign in with correct credentials', async ({ page }) => {
    await signInForm.loginWithCredentials('test1734889756918vs@mailinator.com', 'Test1234!');
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    await expect(page).toHaveTitle('Hillel Qauto');
    await page.context().storageState({path:'./test-data/states/userOne.json'})
    
});

})