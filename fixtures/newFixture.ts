import { test as base } from '@playwright/test';
import HomePage from '../page-object/pages/HomePage';
import SignInForm from '../page-object/forms/SignInForm';
import GaragePage from '../page-object/pages/GaragePage';


    
export const test = base.extend ({
    garagePageAsLogMainUser: async({page},use) => {
        let homePage: HomePage;
        let signInForm: SignInForm;
        let garagePage: GaragePage;

        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);


        await page.goto ('/');
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials('test1734889756918vs@mailinator.com', 'Test1234!');
        await use (garagePage);
        await garagePage.removeLastAddedCar();
    },
})